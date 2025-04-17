/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
    screens: {
      xl: { max: "1279px" },
      lg: { max: "1024px" },
      "md-lg": { max: "991px" },
      md: { max: "768px" },
      sm: { max: "639px" },
      "sm-md": { max: "575px" },
      "sm-xs": { max: "479px" },
      xs: { max: "375px" },
    },
  },
  plugins: [],
};
