const { declare } = require("@babel/helper-plugin-utils");
const importModule = require("@babel/helper-module-imports");

const autoTrackPlugin = declare((api, options, dirname) => {
  api.assertVersion(7);
  //这里的api集成了template、isXX系列方法

  //dirname  /Users/guan/Desktop/babel-learn-demo/babel-plugin-tracker
  //options { trackerPath: 'tracker' }
  //console.log("------->", api, options, dirname);

  return {
    visitor: {
      Program: {
        enter(path, state) {
          //   console.log("=====> state", state); // file path  scope ast code hub opts ced filename
          path.traverse({
            // 如果引入了 tracker 设置state trackerImportId
            ImportDeclaration(curPath) {
              const requirePath = curPath.get("source").node.value;
              // 如果已经引入了tracker
              if (requirePath === options.trackerPath) {
                const specifierPath = curPath.get("specifiers.0");
                if (specifierPath.isImportSpecifier()) {
                  //import tracker from 'tracker';
                  state.trackerImportId = specifierPath.toString();
                } else if (specifierPath.isImportNamespaceSpecifier()) {
                  //import * as tracker from 'tracker';
                  state.trackerImportId = specifierPath.get("local").toString();
                }
                path.stop();
              }
            },
          });

          //没有导入tracker
          if (!state.trackerImportId) {
            state.trackerImportId = importModule.addDefault(path, "tracker", {
              nameHint: path.scope.generateUid("tracker"),
            }).name;
            //保证插入的节点node
            state.trackerAST = api.template.statement(
              `${state.trackerImportId}()`
            )();
          }
        },
      },

      "ClassMethod|ArrowFunctionExpression|FunctionExpression|FunctionDeclaration"(
        path,
        state
      ) {
        const bodyPath = path.get("body");
        if (bodyPath.isBlockStatement()) {
          bodyPath.node.body.unshift(state.trackerAST);
        } else {
          const ast = api.template.statement(
            `{${state.trackerImportId}();return PREV_BODY;}`
          )({ PREV_BODY: bodyPath.node });

          bodyPath.replaceWith(ast);
        }
      },
    },
  };
});
module.exports = autoTrackPlugin;
