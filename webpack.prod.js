const { merge } = require("webpack-merge");
const common = require("./webpack.common");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = merge(common, {
  mode: "production",
  output: {
    filename: "main.[hash].js",
    assetModuleFilename: "assets/images/[hash][ext]",
    clean: true,
  },
  module: { rules: [{ test: /\.css$/, use: [MiniCssExtractPlugin.loader, "css-loader"] }] },
  plugins: [new MiniCssExtractPlugin({ filename: "[name].[hash].css" }), new OptimizeCssAssetsPlugin()],
});
