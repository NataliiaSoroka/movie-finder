module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es2020: true,
  },
  parser: "vue-eslint-parser",
  parserOptions: {
    parser: "@typescript-eslint/parser",
  },
  extends: [
    "eslint:recommended",
    "@nuxtjs/eslint-config-typescript",
    "plugin:prettier/recommended",
  ],
};
