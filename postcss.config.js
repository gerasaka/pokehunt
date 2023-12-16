const TailwindCss = require("tailwindcss");
const AutoPrefixer = require("autoprefixer");

module.exports = {
  plugins: ["postcss-preset-env", TailwindCss, AutoPrefixer],
};
