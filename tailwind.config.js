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
        "ph-dark-yellow": "#dbb416",
        "ph-blue": "#355fab",
        "ph-dark-blue": "#26498a",
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        lemonade: {
          primary: "#fecb01",
          secondary: "#355fab",
          ".btn-nav": {
            color: "#355fab",
            border: "1px solid #355fab",
            display: "flex",
            "justify-content": "center",
            "align-items": "center",
            "border-radius": "9999px",
          },
          ".btn-nav:hover": {
            color: "#fecb01",
            "background-color": "#355fab",
          },
          ".btn-nav:disabled": {
            "background-color": "whitesmoke",
            color: "slategray",
            border: "none",
          },
        },
      },
    ],
  },
};
