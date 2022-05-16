module.exports = {
  extends: 'airbnb-base',
  rules: {
    'class-methods-use-this': ['off'],
    'no-underscore-dangle': ['error', { allowAfterThis: true }],
  },
  globals: {
    fetch: false,
    document: false,
    FileReader: false,
  }
};
