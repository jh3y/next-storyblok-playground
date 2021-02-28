const plugin = require('tailwindcss/plugin')
module.exports = {
  purge: ['./pages/**/*.js', './components/**/*.js'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      animation: {
        wave: 'wave 1s calc(var(--index) * -0.1s) infinite',
      },
      keyframes: {
        wave: {
          '50%': {
            transform: 'translateY(-50%)',
          },
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    plugin(function ({ addComponents }) {
      const components = {
        '.text-hue': {
          color: 'hsl(var(--hue, 0), 80%, 50%)',
        },
      }
      addComponents(components)
    }),
  ],
}
