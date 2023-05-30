module.exports = {
  collectCoverage: true,
  moduleNameMapper: {

    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/client/src/components/related-items-and-outfit/__mocks__/fileMock.js',
  },

  testEnvironment: 'node',
  transformIgnorePatterns: [
    'node_modules/pg/',
  ],
};