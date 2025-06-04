const eslintPluginReact = require('eslint-plugin-react');
const babelParser = require('@babel/eslint-parser');

module.exports = [
  {
    files: ['src/**/*.{js,jsx,mdx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parser: babelParser,
      parserOptions: { requireConfigFile: false, babelOptions: { presets: ['@babel/preset-react'] } }
    },
    plugins: { react: eslintPluginReact },
    rules: {
      'react/react-in-jsx-scope': 'off'
    }
  }
];
