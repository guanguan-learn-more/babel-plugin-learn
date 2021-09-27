const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;

const code = `
    const obj={
        name:'Joy'
    }
`;
const ast = parser.parse(code, {
  sourceType: "unambiguous",
});

traverse(ast, {
    VariableDeclaration(path,state){
        state={}
        state.shareValue = "测试state共享数据"
        console.log(state);

    },
    Identifier(path,state){
        console.log(state)
    }
});
