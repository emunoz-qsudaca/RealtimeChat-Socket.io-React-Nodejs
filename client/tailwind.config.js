/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
    },
    colors: {
      transparent: "transparent",
      current: "currentColor",
      almostBlack: "#14213d",
      white: "#ffffff",
      midnight: "#121063",
      calipso: "#219ebc",
      tahiti: "#3ab7bf",
      silver: "#ecebff",
      "bubble-gum": "#ff77e9",
      bermuda: "#78dcca",
      maroon: "#800000",
    },
    extend: {
      backgroundImage: {
        "background-pattern": "url('/public/background-pattern.jps')",
      },
    },
  },
  plugins: [],
};
