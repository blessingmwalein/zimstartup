/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#052941",
        secondary: "#9FC031",
        "secondary-light": "#D9FD54",
        gray: "#C6C6C6",
        error: "#FF0000",
      },
    },
  },
  plugins: [],
};
