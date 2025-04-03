/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "mini-stars": "url('./public/background-stars.svg')",
      },
      letterSpacing: {
        "negative-1.05": "-1.05px",
      },
      fontFamily: {
        custom: ["Antonio", "sans-serif"],
      },
    },
  },
  plugins: [],
};
