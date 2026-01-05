/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "1rem",
    },
    screens: {
      xs: "480px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    extend: {
      colors: {
        primary: {
          50: '#fef7ff',
          100: '#fdeeff',
          200: '#fbd9ff',
          300: '#f8b5ff',
          400: '#f382ff',
          500: '#FF35FF', // メインカラー
          600: '#e51de5',
          700: '#c814c8',
          800: '#a512a5',
          900: '#871487',
          950: '#5a0a5a',
        },
        accent: {
          pink: '#FF35FF',
          'pink-light': '#FF6BFF',
          'pink-dark': '#CC2ACC',
          'pink-soft': '#FFB5FF',
        }
      },
      fontFamily: {
        mincho: [
          '"Hiragino Mincho Pro"',
          '"Yu Mincho"',
          '"YuMincho"',
          '"Hiragino Mincho ProN"',
          '"Hiragino Mincho Pro"',
          "serif",
        ],
      },
      fontSize: {
        xxs: ['0.625rem', { lineHeight: '0.65rem' }],
      },
    },
  },
  plugins: [],
};
