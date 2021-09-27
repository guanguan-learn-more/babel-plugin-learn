const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const webpack = require("webpack");

module.exports = {
  mode: "development",
  entry: {
    main: "./src/index.jsx",
  },
  devtool:'hidden-source-map',

  output: {
    filename: "[name].[hash:8].js",
    path: path.resolve(__dirname, "dist"),
  },
  // 关闭webpack 自动压缩 混淆 代码
  optimization: {
    minimize: true, // <---- 是否禁用 uglify.
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: "Output Management",
      template: "./index.html", //根绝template生成html
    }),
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: "babel-loader",
        exclude: "/node_modules/",
      },

      // {
      //   test: /\.jsx?$/,
      //   exclude: /(node_modules)/,
      //   use: [
      //     {
      //       loader: "babel-loader",
      //       // options: {
      //       //   presets: [ "@babel/preset-env", "@babel/preset-react"], //用于解析ES6+React
      //       // },
      //       // options: {
      //       //   //传入loader的参数
      //       //   presets: [
      //       //     ["@babel/preset-react"], //用于解析一组语法特性
      //       //     [
      //       //       "@babel/preset-env", //包含当前所有 ECMAScript 标准里的最新特性
      //       //       {
      //       //         targets: {
      //       //           browsers: ["last 4 versions", "ie >= 9", "safari >= 10"], // "last 2 Chrome versions",
      //       //         },
      //       //         "useBuiltIns": "entry",
      //       //         "corejs": 2,
      //       //       },
      //       //     ],
      //       //   ],
      //       //   plugins: [
      //       //     //用于解析某个语法特性
      //       //     "@babel/plugin-proposal-object-rest-spread", //解析对象的扩展运算符（ES2018）
      //       //     // "@babel/plugin-proposal-export-default-from",  //解析额外的export语法:export v from "xx/xx"
      //       //     // "@babel/plugin-proposal-export-namespace-from", //解析额外的export语法:export v as vv from "xx/xx";
      //       //     // "@babel/plugin-proposal-class-properties",   //解析class中的静态属性
      //       //     // "@babel/plugin-proposal-dynamic-import" ,
      //       //     [ path.join(__dirname, './plugins/babel-plugins-test.js'),{namespace:'cairo'}]
      //       //   ],
      //       // },
      //     },
      //   ],
      // },
    ],
  },
};
