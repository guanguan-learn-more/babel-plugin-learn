const { transformFromAstSync } = require("@babel/core");
const parser = require("@babel/parser");
const autoTrackPlugin = require("./plugins/babel-plugin-tracker");
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
      autoTrackPlugin,
      {
        trackerPath: "tracker",
      },
    ],
  ],
});


console.log(code);
