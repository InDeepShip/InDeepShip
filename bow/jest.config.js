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
  coverageDirectory: "<rootDir>/coverageReport/",
  preset: "jest-puppeteer"
};