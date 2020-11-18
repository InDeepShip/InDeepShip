// jest.config.js
const {defaults} = require('jest-config');
module.exports = {

  // transformIgnorePatterns: [
  //   "<rootDir>/node_modules/(?!(axios|axios-mock-adapter))"
  // ],
  // transform: {
  //   "\\.js$": "<rootDir>/node_modules/babel-jest"
  // },

  verbose: true,
  collectCoverage: false,
  // coveragePathIgnorePatterns: [
  //   "<rootDir>/node_modules/",
  //   "<rootDir>/testCoverageReport/",
  //   "<rootDir>/public/"
  // ],
  collectCoverageFrom: [
    "**/*.{js,jsx}",
    "!**/node_modules/**",
    "!**/vendor/**",
    "!jest.config.js",
    "!babel.config.js",
    "!**/testCoverageReport/**"
  ],
  coverageDirectory: "<rootDir>/testCoverageReport/",
  preset: "jest-puppeteer",
  testTimeout: 15000
};
