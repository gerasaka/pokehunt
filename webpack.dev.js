const { merge } = require("webpack-merge");
const common = require("./webpack.common");

module.exports = merge(common, {
  mode: "development",
  output: {
    filename: "[name].js",
    assetModuleFilename: "assets/[name][ext]",
  },
  devtool: "source-map",
});
