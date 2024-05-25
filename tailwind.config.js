/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      'white': '#ffffff',
      'bggray': '#F8F9FD',
      'txtgray': '#6A6E83',
      'txtblue': '#5A81FA',
      'txtdarkblue': '#2C3D8F',
      'black': '#1F1F1F',
      'red': '#EF4444',
    },
  },
  plugins: [],
}