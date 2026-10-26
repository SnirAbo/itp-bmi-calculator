/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eef9ff',
          100: '#d8f1ff',
          200: '#b6e6ff',
          300: '#83d7ff',
          400: '#3fc2ff',
          500: '#12a8ff',
          600: '#0089e6',
          700: '#006fbc',
          800: '#065f99',
          900: '#0b4e7d'
        }
      }
    }
  },
  plugins: []
}
