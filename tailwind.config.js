/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Lato', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
      colors: {
        brand: {
          50: '#fdf2f8',
          100: '#fce7f3',
          500: '#ec4899', // Pink/Rose
          600: '#db2777',
          700: '#be185d', // Deep Rose
          800: '#9d174d',
          900: '#831843', // Wine
        }
      }
    },
  },
  plugins: [],
}