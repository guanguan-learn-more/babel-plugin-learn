const { transformFromAstSync } = require("@babel/core");
const parser = require("@babel/parser");
const autoTrackButtonPlugin = require("./plugins/babel-pugin-button-lx");
const fs = require("fs");
const path = require("path");

const sourceCode = fs.readFileSync(path.join(__dirname, "./code.js"), {
  encoding: "utf-8",
});

const ast = parser.parse(sourceCode, {
  sourceType: "unambiguous",
  plugins: ["jsx"],
});

const { code } = transformFromAstSync(ast, sourceCode, {
  plugins: [
    [
      autoTrackButtonPlugin,
      {
        trackerPath: "tracker",
      },
    ],
  ],
});

const output = fs.writeFileSync(path.join(__dirname, "./out.js"), code, {
  encoding: "utf-8",
});

console.log(code);
