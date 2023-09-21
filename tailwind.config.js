/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}", "./src/**/*"],
  theme: {
    extend: {
      colors: {
        brand: "#009CCC",
        primary: {
          light: "#06b6d4", // For lighter primary color
          DEFAULT: "#009CCC", // Normal primary color
          dark: "#0891b2", // Used for hover, active, etc.
        },
      },
    },
  },
  plugins: [require("kutty")],
}

