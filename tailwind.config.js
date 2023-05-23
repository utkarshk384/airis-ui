/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./layouts/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#17234D",
        secondary: "#1B7DA8",
        accent: "#027FFF",
      },
    },
  },
  corePlugins: {
    container: false,
    preflight: false,
  },
  plugins: [
    require("./plugins/container.js"),
    require("./plugins/customUtils.js"),
    require("./plugins/scopedPreflight.js"),
  ],
};
