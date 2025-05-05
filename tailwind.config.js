/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/renderer/**/*.{jsx,js}'],
  theme: {
    extend: {
      colors: {
        primary: '#1D4ED8', // Azul para botones principales
        secondary: '#F59E0B' // Amarillo para acentos
      }
    }
  },
  plugins: []
};