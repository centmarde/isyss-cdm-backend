const baseConfig = require('../../eslint.config.mjs');

module.exports = {
  ...baseConfig,
  parserOptions: {
    ...baseConfig.parserOptions,
    project: './tsconfig.json', // specific to this service
    tsconfigRootDir: __dirname,
  },
};
