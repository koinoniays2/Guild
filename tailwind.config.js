/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    ],
  theme: {
    extend: {
      colors: {
        "black-color" : "#353535",
        "white-color" : "#F6F6F6"
      },
    },
  },
  plugins: [],
}

