/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      'hero-pattern': "url('./assets/background.jpg')",
    },
  },
  plugins: [],
}

