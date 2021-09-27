module.exports = function (babel, options) {
  const { types, template } = babel;
  const { namespace } = options;
  console.log("namespace", namespace);
  return {
    visitor: {
      AssignmentExpression(path) {
        var { property } = path.node.left;
        const left = path.get("left").toString();
        const right = path.get("right").toString();

        if (left.includes('location')) {
          path.replaceWith(
            template(`
                    window.app && window.app.router && window.app.router("${namespace}", "location.${
              property && property.name
            }", URL)
                    `)({ URL: path.node.right.value })
          );
        }
      },
    },
  };
};
