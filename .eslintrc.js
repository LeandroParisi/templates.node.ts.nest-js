module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 11,
    sourceType: "module",
},
  plugins: ['@typescript-eslint/eslint-plugin', "eslint-plugin-import-helpers"],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js',"jest.config.js"],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',  
    "import-helpers/order-imports": [
      "warn",
      {
          newlinesBetween: "always",
          groups: [
              "module",           
              "/@gateways/",
              "/@utils/",
              "/@use-cases/",
              "/@domain/", 
              "/@configs/",    
              "/@common/",
              ["parent", "sibling", "index"],
          ],
          alphabetize: { order: "asc", ignoreCase: true },
      },
    ],
  },
};
