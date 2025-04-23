module.exports = {
  plugins: ["tailwindcss"],
  extends: ["react-app", "plugin:tailwindcss/recommended"],
  rules: {
    "tailwindcss/no-custom-classname": [
      "warn",
      {
        whitelist: ["header-top", "my-swiper", "custom_bullet"],
      },
    ],
    "tailwindcss/classnames-order": "off",
  },
};
