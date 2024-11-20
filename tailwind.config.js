import daisyui from 'daisyui';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{tsx,js}'],
  darkMode: 'selector',
  theme: {
    screens: {
      tablet: '640px',
      desktop: '1280px',
    },
    extend: {
      animation: {
        moveFirstToken: 'moveFirstToken 0.1s linear forwards',
        moveSecondToken: 'moveSecondToken 0.1s linear forwards',
        moveThirdToken: 'moveThirdToken 0.1s linear forwards',
        moveThirdTokenReverse: 'moveThirdTokenReverse 0.1s linear forwards',
      },
      fontFamily: {
        archivoNarrow: ['ArchivoNarrow'],
        archivoNarrowBold: ['ArchivoNarrowBold'],
        archivoNarrowSemiBold: ['ArchivoNarrowSemiBold'],
        archivoMedium: ['ArchivoMedium'],
      },
      boxShadow: {
        shadowTab: '0px 0px 0px 4px #33cc7f',
      },
      colors: {
        primary: {
          grey: '#f0f1f5',
          red: '#AA0909',
          yellow: '#FFBF00',
          white: '#F0F1F5',
          green: '#33cc7f',
          darkgreen: '#145233',
        },
      },
    },
  },
  plugins: [daisyui],
};
