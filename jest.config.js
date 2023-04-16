// module.exports = {
//   "testEnvironment": "jsdom"
// }

module.exports = {
  "moduleNameMapper": {
    ".+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$": "identity-obj-proxy"
  },
  "testEnvironment": "jsdom",
  "testPathIgnorePatterns" : [
    "<rootDir>/src/tests/wdio/" 
  ]
}