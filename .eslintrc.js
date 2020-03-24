module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
  },
  extends: [
    'airbnb-typescript/base',
    'prettier',
    'prettier/@typescript-eslint',
  ],
  plugins: ['prettier'],
  parserOptions: {
    project: './tsconfig.json',
    createDefaultProgram: true,
  },
};
