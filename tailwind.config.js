/** @type {import('tailwindcss').Config} */
module.exports = {
  jit: true,
  content: ["./src/**/*.{html,js}"],
  purge: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        transparent: "transparent",
        "ph-dark-yellow": "#dbb416",
        "ph-dark-blue": "#26498a",
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        lightPoke: {
          primary: "#fecb01",
          secondary: "#355fab",
          accent: "#ef4444",
          neutral: "#047857",
          "base-100": "#f7fdee",
          info: "#d97706",
          success: "#4ade80",
          warning: "#b91c1c",
          error: "#7e22ce",
        },
      },
    ],
  },
};
