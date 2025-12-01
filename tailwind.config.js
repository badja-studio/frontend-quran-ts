/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#2E7D32", // Islamic Green
          light: "#4CAF50",
          dark: "#1B5E20",
        },
        background: {
          DEFAULT: "#FFFFFF",
          paper: "#F5F5F5",
        },
      },
    },
  },
  plugins: [],
  important: "#root",
};
