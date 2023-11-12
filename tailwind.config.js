/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#f363ac",
        secondary: "#0B0A1F"
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography')
  ]
}
