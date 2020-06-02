module.exports = {
  env: {
    browser: true,
    es6: true,
    jest: true,
  },
  extends: [
    'standard',
    'plugin:react/recommended',
    'plugin:prettier/recommended',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  parser: 'babel-eslint',
  plugins: ['react', 'prettier'],
  rules: {
    'no-console': 1,
    'react/react-in-jsx-scope': 0,
  },
}
