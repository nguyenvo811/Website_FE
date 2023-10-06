/** @type {import('tailwindcss').Config} */
module.exports = {
  corePlugins: {
    preflight: false,
  },
  content: [
    "./public/index.html",
    '.src/**/*.jsx',
    "./src/**/*.{html,js,jsx}",
    './src/**/*.{js,jsx,ts,tsx}',
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('flowbite/plugin'),
    "tw-elements/dist/plugin"
  ],
  important: true,
}

