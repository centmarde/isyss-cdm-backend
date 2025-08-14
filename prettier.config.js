module.exports = {
  tabWidth: 2,
  useTabs: false,
  semi: true,
  singleQuote: true,
  trailingComma: 'all',
  printWidth: 80,
  bracketSpacing: true,
  arrowParens: 'always',
  plugins: ['prettier-plugin-tailwindcss'],
  overrides: [
    {
      files: '*.{tsx,jsx,html}',
      options: { plugins: ['prettier-plugin-tailwindcss'] },
    },
  ],
};
