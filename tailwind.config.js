/** @type {import('tailwindcss').Config} */
module.exports = {
  jit: true,
  content: ["./src/**/*.{html,js}"],
  purge: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        transparent: "transparent",
        "ph-yellow": "#fecb01",
        "ph-blue": "#355fab",
        "ph-dark-blue": "#26498a",
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["lemonade"],
  },
};
