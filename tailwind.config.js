/** @type {import('tailwindcss').Config} */
module.exports = {
  jit: true,
  content: ["./src/**/*.{html,js}"],
  purge: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: { transparent: "transparent" },
    },
  },
  plugins: [require("daisyui")],
};
