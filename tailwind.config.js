const colors = require('tailwindcss/colors')

module.exports = {
  prefix: "tw-",
  purge: {
    content: [
      './src/components/**/*.vue',
      './src/layouts/**/*.vue',
      './src/pages/**/*.vue',
      './src/plugins/**/*.js',
      'nuxt.config.js'
    ],
  },
  theme: {
    fontFamily: {
      'open-sans': ["'Open Sans'",'sans-serif']
    },
    colors: {
      primary: 'var(--color-primary)',
      secondary: 'var(--color-secondary)',
      ternary: 'var(--color-ternary)',
      black: colors.black,
      white: colors.white,
    }
  },
  darkMode: false,
  theme: {
    extend: {}
  },
  variants: {
    extend: {}
  },
  plugins: [],
  corePlugins: {
    preflight: false
  }
};
