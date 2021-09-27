const template = require("@babel/template").default;
const types = require("@babel/types");
const generate = require("@babel/generator").default;


const ast = template.ast(`window.router.push('/home')`);



const { code, map } = generate(ast, { sourceMaps: true })
console.log("===> code", code);
console.log("===> map", map);
