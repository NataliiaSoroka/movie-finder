/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    container: {
      center: true,
    },
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1560px",
      "3xl": "1920px",
    },
    colors: {
      black: "#151515",
      white: "#EAE2EB",
      blue: "#2A41E8",
      red: "#D20026",
      transparent: "transparent",
      orange: {
        DEFAULT: "#e6a23c",
        100: "rgba(230, 162, 60, 0.1)",
      },
    },
    extend: {
      boxShadow: {
        layout: "rgba(0, 0, 0, 0.3) 0 0 10px",
      },
    },
  },
  plugins: [],
};
