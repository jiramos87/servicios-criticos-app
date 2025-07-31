module.exports = {
  env: {
    node: true,
    es2021: true,
  },
  extends: ['eslint:recommended', 'plugin:prettier/recommended'],
  parserOptions: {
    ecmaVersion: '2021',
    sourceType: 'module',
  },
  rules: {
    'prettier/prettier': 'warn',
  },
};
