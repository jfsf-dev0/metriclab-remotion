/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        mlab: {
          blue: "#2563eb",
          green: "#16a34a",
          red: "#dc2626",
          amber: "#d97706",
          text: "#111827",
          gray: "#6b7280",
          bg: "#f9fafb"
        }
      }
    },
  },
  plugins: [],
};
