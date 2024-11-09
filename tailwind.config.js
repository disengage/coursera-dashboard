/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */

const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  darkMode: "selector",
  content: [
    "./index.html",
    "./src/**/*.{html,js,jsx,tsx}",
    "./node_modules/preline/dist/preline.js",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.{js,ts}",
  ],
  theme: {
    screens: {
      // xsss: { min: "0px", max: "159px" },
      // xss: { min: "160px", max: "319px" },
      xs: { min: "0px", max: "639px" },
      sm: { min: "640px", max: "767px" },
      md: { min: "768px", max: "1023px" },
      lg: { min: "1024px", max: "1279px" },
      xl: { min: "1280px", max: "1536px" },
      "2xl": { min: "1537px" },
    },
    extend: {
      fontFamily: {
        sans: ["InterVariable", ...defaultTheme.fontFamily.sans],
      },
    },
    container: {
      center: true,
    },
  },
  plugins: [require("preline/plugin")],
};
