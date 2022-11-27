// tailwind.config.js
module.exports = {
  mode: "jit",
  content: [
    // ...
    "./node_modules/@vechaiui/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}" // path to vechaiui
  ],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [
    require("@tailwindcss/forms")
  ],
};