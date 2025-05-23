/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./app/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'main': 'var(--color-main)',
        'main-light' : 'var(--color-main-light)',
        'main-lighter' : 'var(--color-main-lighter)',
        'main-lighter1' : 'var(--color-main-lighter1)',
        'main-lighter2' : 'var(--color-main-lighter2)',

      },
    },
  },
  plugins: [],

}