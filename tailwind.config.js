module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],

  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        home: "#c97164",
      },
      fontFamily: {
        zen_kurenaido: ["Zen Kurenaido", "sans-serif"],
        dosis: ["Dosis", "sans-serif"],
      },
      rotate: {
        360: "360deg",
      },
      height: {
        0.25: "1px",
        vw: "1.11vw",
      },
      width: {
        vw: "7vw",
      },
      transitionDuration: {
        400: "400ms",
      },
    },
  },
  variants: {
    extend: {
      scale: ["group-hover"],
      rotate: ["group-hover"],
    },
  },
  plugins: [],
}
