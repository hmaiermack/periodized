module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        pOrange: {
          200: '#F2B09F',
          400: '#e76f51',
          600: '#AD533D'
        },
        pBlue: {
          200: '#CAFFFC',
          400: '#9EFFF9',
          600: '#6FB3AE'
        },
        pGrey: {
          200:  '#C9C9C9',
          400: '#4c4c4c',
          600: '#393939'
        }
      },
      transitionProperty: {
        'height': 'height'
      }
    },
    container: {
      center: true
    },
    
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
