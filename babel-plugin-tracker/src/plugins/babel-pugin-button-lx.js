const { declare } = require("@babel/helper-plugin-utils");
const importModule = require("@babel/helper-module-imports");
const types = require("@babel/types");

// 思路
// 1. 没有导入tracker模块 则需要导入，如果导入了，则忽略
// 2. 遍历监听所有的Button 收集Button绑定的click事件, 保存在state中
// 3. 在所有的Button绑定的事件中添加埋点

const autoTrackButtonPlugin = declare((api, options, dirname) => {
  api.assertVersion(7);
  //这里的api集成了template、isXX系列方法

  //dirname  /Users/guan/Desktop/babel-learn-demo/babel-plugin-tracker
  //options { trackerPath: 'tracker' }
  //console.log("------->", api, options, dirname);

  return {
    visitor: {
      Program: {
        enter(path, state) {
          state.TRACKER_LISTENER = {};
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
            JSXElement(path) {
              const name = path.node.openingElement.name.name;

              if (name === "Button") {
                const { children, openingElement } = path.node;
                const { attributes } = openingElement;
                const buttonName = children[0].value;
                attributes.map((attr) => {
                  const { name, value } = attr;
                  if (
                    name.name === "onClick" &&
                    value.expression &&
                    value.expression.name
                  ) {
                    //TRACKER_LISTENER: { handleCancel: '确定', handleSubmit: '确定' }
                    state.TRACKER_LISTENER[value.expression.name] = "确定";
                  }
                });
              }
            },
          });

          //没有导入tracker
          if (!state.trackerImportId) {
            state.trackerImportId = importModule.addDefault(path, "tracker", {
              nameHint: path.scope.generateUid("tracker"),
            }).name;

            //保证插入的节点node
            state.trackerBuilder = api.template(
              `${state.trackerImportId}({operator:%%operator%%})`
            );
          }
        },
      },
     

      "ClassMethod|ArrowFunctionExpression|FunctionExpression|FunctionDeclaration"(
        path,
        state
      ) {
        
        const bodyPath = path.get("body");
        const methodName = path.node.key && path.node.key.name;
        const shouldTracker = state.TRACKER_LISTENER.hasOwnProperty(methodName);
        const operator = state.TRACKER_LISTENER[methodName];

       
        if (bodyPath.isBlockStatement() && shouldTracker) {
          const operator = state.TRACKER_LISTENER[methodName];
          bodyPath.node.body.unshift(
            state.trackerBuilder({
              operator: types.stringLiteral(operator),
            })
          );
        } else {
            // const ast = api.template.statement(
            //   `{${state.trackerImportId}();return PREV_BODY;}`
            // )({ PREV_BODY: bodyPath.node });
            // bodyPath.replaceWith(ast);
        }
      },
    },
  };
});
module.exports = autoTrackButtonPlugin;
