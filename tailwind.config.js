module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],

  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        home: "#c97164",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
