/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{tsx,js}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          dark: '#ODODOD',
          red: '#AA0909',
          yellow: '#FFBF00',
          white: '#FOF1F5',
          green: '#33CCTF',
          darkgreen: '#145233',
        }
      }
    },
  },

  plugins: [],
}

