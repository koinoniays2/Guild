/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    ],
  theme: {
    extend: {
      colors: {
        "back-color" : "#000054",
        "font-black" : "#353535",
        "font-white" : "#F6F6F6"
      },
    },
  },
  plugins: [],
}

