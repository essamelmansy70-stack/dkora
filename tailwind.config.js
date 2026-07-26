/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0fdf4',
          100: '#dcfce7',
          500: '#0d9488',
          600: '#0f766e',
          700: '#115e59',
          900: '#134e4a',
        },
        accent: {
          500: '#f59e0b',
          600: '#d97706',
        }
      },
      fontFamily: {
        cairo: ['Cairo', 'Segoe UI', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
