/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        grey: "#666",
        // Chakra UI blue
        blue: {
          50: "#ebf8ff",
          100: "#bee3f8",
          200: "#90cdf4",
          300: "#63b3ed",
          400: "#4299e1",
          500: "#3182ce",
          600: "#2b6cb0",
          700: "#2c5282",
          800: "#2a4365",
          900: "#1A365D",
        },
      },
      gridTemplateColumns: {
        articles: "repeat(auto-fit, minmax(300px, 1fr))",
      },
    },
  },
  plugins: [],
};
