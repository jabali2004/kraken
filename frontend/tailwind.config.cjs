/** @type {import('tailwindcss').Config} */
module.exports = {
  prefix: '',
  content: ['./src/**/*.{tsx,jsx,ts,js}'],
  theme: {
    extend: {
      gridTemplateRows: {
        '[auto,auto,1fr]': 'auto auto 1fr',
      },
    },
  },
  plugins: [
    require('daisyui'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
  ],
  daisyui: {
    prefix: '',
    theme: 'dark',
  },
};
