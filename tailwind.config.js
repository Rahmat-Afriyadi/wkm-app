module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}", // Or if using `src` directory:
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js",
  ],
  theme: {
    extend: {
      colors: {
        red: "#ED1C24",
        cyan: "#6ECADE",
        black: "#191919",
        white: "#FFFFFF",
        yellow: "#FEE600",
      },
      fontFamily: {
        inter: ["var(--font-inter)", "sans-serif"],
        kollektif: ["var(--font-kollektif)", "sans-serif"],
        hammersmith: ["var(--font-hammersmith)", "sans-serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
  darkMode: ["class", '[data-mode="dark"'],
};
