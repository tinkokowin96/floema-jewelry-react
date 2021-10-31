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
    },
  },
  variants: {
    extend: {
      scale: ["group-hover"],
    },
  },
  plugins: [],
}
