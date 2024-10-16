module.exports = {
  preset: "jest-preset-angular",
  setupFilesAfterEnv: ["<rootDir>/setup-jest.ts"],
  globalSetup: "jest-preset-angular/global-setup",
  transform: {
    "^.+\\.(ts|js|html)$": "jest-preset-angular",
  },
  transformIgnorePatterns: ["node_modules/(?!.*\\.mjs$)"],
  moduleFileExtensions: ["ts", "html", "js", "json", "mjs"],
  moduleNameMapper: {
    "\\.(html)$": "<rootDir>/src/__mocks__/htmlMock.js",
    "\\.(css|scss)$": "identity-obj-proxy",
  },
};
