module.exports = {
  plugins: ["tailwindcss"],
  extends: ["react-app", "plugin:tailwindcss/recommended"],
  rules: {
    "tailwindcss/no-custom-classname": [
      "warn",
      {
        whitelist: ['header-top'],
      },
    ],
    "tailwindcss/classnames-order": "off",
  },
};
