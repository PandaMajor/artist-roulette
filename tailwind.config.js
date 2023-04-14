/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
        playfair: ['Playfair Display'],
      },
      colors: {
        'blueberry': '#a5a6ec',
        'light-bg' : 'rgba(255, 255, 255, 0.05)',
        'dark-bg' : 'rgba(31, 31, 31, 0.05)',
      },
      backgroundImage: {
        'gradient': "url('./assets/gradient.png')",
      }
    },
  },
  plugins: [],
}
