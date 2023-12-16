const { merge } = require("webpack-merge");
const common = require("./webpack.common");

module.exports = merge(common, {
  mode: "development",
  output: {
    filename: "main.js",
    assetModuleFilename: "assets/images/[name][ext]",
  },
  module: {
    rules: [{ test: /\.css$/, use: ["style-loader", { loader: "css-loader" }] }],
  },
});
