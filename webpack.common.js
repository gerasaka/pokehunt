const path = require("path");
const { populatePageEntries, populateHtmlPlugins } = require("./src/script/utils/config");

const pages = ["main", "details"];

module.exports = {
  entry: populatePageEntries(pages),
  output: { path: path.resolve(__dirname, "dist") },
  module: {
    rules: [
      { test: /\.(png|jpg|jpeg|svg|webp|gif)$/i, type: "asset/resource" },
      { test: /\.html$/i, loader: "html-loader" },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
    ],
  },
  plugins: populateHtmlPlugins(pages),
};
