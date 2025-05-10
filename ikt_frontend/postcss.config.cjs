// postcss.config.js or postcss.config.cjs
const tailwindcss = require('@tailwindcss/postcss7-compat');
const autoprefixer = require('autoprefixer');

module.exports = {
  plugins: [
    tailwindcss,
    autoprefixer,
  ],
};
