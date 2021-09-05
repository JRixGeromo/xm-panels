module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/vue3-essential',
    '@vue/airbnb',
  ],
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    'linebreak-style': ["error", "windows"],
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    "object-curly-newline": ["error", {
      "ObjectExpression": "always",
      "ObjectPattern": { "minProperties": 5 },
      "ImportDeclaration": { "minProperties": 5 },
      "ExportDeclaration": { "minProperties": 5 }
    }],
    "max-len": ["error", {
      "code": 150,
      "ignoreComments": true,
      "ignoreUrls": true,
      "ignoreStrings": true,
      "ignoreRegExpLiterals": true
    }],
    "no-shadow": ["error", { "allow": ["state"] }],
    'no-plusplus': [2, { "allowForLoopAfterthoughts": true }],
    'no-param-reassign': ["error", { "props": false }],
    'operator-linebreak': ["off"],
    "import/prefer-default-export": "off",
  },
};
