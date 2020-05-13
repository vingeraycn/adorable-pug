module.exports = {
  printWidth: 100,
  tabWidth: 2,
  singleQuote: true,
  overrides: [
    {
      files: '*.pug',
      options: {
        parser: 'pug',
        singleQuote: true,
      },
    },
  ],
};
