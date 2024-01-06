const HtmlWebpackPlugin = require("html-webpack-plugin");

const populatePageEntries = (pages) => {
  return pages.reduce(
    (config, page) => {
      config[page] = `./src/script/${page}.js`;
      return config;
    },
    {
      app: "./src/app.js",
    },
  );
};

const generateHtmlPlugin = (page) => {
  return new HtmlWebpackPlugin({
    inject: true,
    title: `${page}`,
    filename: `${page === "main" ? "index" : page}.html`,
    template: `./src/${page === "main" ? "index" : page}.html`,
    chunks: ["app", page],
  });
};

const populateHtmlPlugins = (pages) => {
  return [].concat(pages.map((page) => generateHtmlPlugin(page)));
};

module.exports = {
  populatePageEntries,
  populateHtmlPlugins,
};
