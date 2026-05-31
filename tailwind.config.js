module.exports = {
  mode: 'jit',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    backgroundColor: theme => ({
      ...theme('colors'),
      'ub-grey': '#171c28',
      'ub-warm-grey': "#232834",
      'ub-cool-grey': "#11141d",
      'ub-orange': "#1793d1", // Arch Blue
      'ub-lite-abrgn': "#1793d1",
      'ub-med-abrgn': "#147ba0",
      'ub-drk-abrgn': "#0f141f",
      'ub-window-title': "#171c28",
      'ub-gedit-dark': "#1e222d",
      'ub-gedit-light': "#292f3d",
      'ub-gedit-darker': "#151820",
    }),
    textColor: theme => ({
      ...theme('colors'),
      'ubt-grey': '#F6F6F5',
      'ubt-warm-grey': "#AEA79F",
      'ubt-cool-grey': "#333333",
      'ubt-blue': "#1793d1",
      'ubt-green': "#4E9A06",
      'ubt-gedit-orange': "#1793d1",
      'ubt-gedit-blue': "#1793d1",
      'ubt-gedit-dark': "#171c28",
    }),
    borderColor: theme => ({
      ...theme('colors'),
      DEFAULT: theme('colors.gray.300', 'currentColor'),
      'ubb-orange': '#E95420'
    }),
    minWidth: {
      '0': '0',
      '1/4': '25%',
      '1/2': '50%',
      '3/4': '75%',
      'full': '100%',
    },
    minHeight: {
      '0': '0',
      '1/4': '25%',
      '1/2': '50%',
      '3/4': '75%',
      'full': '100%',
    },
    extend: {
      zIndex: {
        '-10': '-10',
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
