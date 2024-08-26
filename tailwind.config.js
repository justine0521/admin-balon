/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        Green: 'rgb(74 169 79)',
        Blue: '#3b82f6',
        Red: 'rgb(255, 0, 0)',
        White: '#f9f9f9',
        Grey: '#eee',
        Darkgrey: '#AAAAAA'
      },
    },
  },
  plugins: [],
}

