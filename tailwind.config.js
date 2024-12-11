/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        mainred: "#DC2626",
        // mainred: "#4880FF",
        mainText: "#202224",
        inputBg: "#F1F4F9",
        inputBorder: "#D8D8D8",
        
      },
      fontFamily: {
        sans: ['"Nunito Sans"', "sans-serif"],
      },
    },
  },
  plugins: [],
};
