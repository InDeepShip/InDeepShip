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
  collectCoverage: true,
  // coveragePathIgnorePatterns: [
  //   "<rootDir>/node_modules/",
  //   "<rootDir>/testCoverageReport/",
  //   "<rootDir>/public/"
  // ],
  collectCoverageFrom: [
    "**/*.{js,jsx}",
    "**/src/*.{js,jsx}",
    "**/src/components/*.{js,jsx}",
    "**/src/actions/*.{js,jsx}",
    "**/src/constants/*.{js,jsx}",
    "**/src/reducers/*.{js,jsx}",
    "!**/node_modules/**",
    "!**/vendor/**",
    "!jest.config.js",
    "!babel.config.js",
    "!**/testCoverageReport/**"
  ],
  //coverageDirectory: "<rootDir>/testCoverageReport/",
  preset: "jest-puppeteer",
  testTimeout: 60000
};
