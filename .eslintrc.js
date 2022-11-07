module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
  },
  extends: [
    'airbnb-typescript/base',
    'prettier',
  ],
  plugins: ['prettier', 'import'],
  parserOptions: {
    project: './tsconfig.json',
    createDefaultProgram: true,
  },
};
