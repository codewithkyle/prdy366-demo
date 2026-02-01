/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class", '[theme="dark"]'],
  content: ["./view/**/*.{html,templ}"],
  theme: {
    extend: {
      colors: {
        grey: {
          50: "hsl(var(--grey-50-hsl) / <alpha-value>)",
          100: "hsl(var(--grey-100-hsl) / <alpha-value>)",
          200: "hsl(var(--grey-200-hsl) / <alpha-value>)",
          300: "hsl(var(--grey-300-hsl) / <alpha-value>)",
          400: "hsl(var(--grey-400-hsl) / <alpha-value>)",
          500: "hsl(var(--grey-500-hsl) / <alpha-value>)",
          600: "hsl(var(--grey-600-hsl) / <alpha-value>)",
          700: "hsl(var(--grey-700-hsl) / <alpha-value>)",
          800: "hsl(var(--grey-800-hsl) / <alpha-value>)",
          900: "hsl(var(--grey-900-hsl) / <alpha-value>)",
          950: "hsl(var(--grey-950-hsl) / <alpha-value>)",
        },
      },
    },
  },
  plugins: [],
}

