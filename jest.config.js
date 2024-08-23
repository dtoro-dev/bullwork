module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  transform: {
    "^.+\\.ts$": "ts-jest",
  },
  testMatch: ["**/tests/**/*.test.ts"],
  moduleFileExtensions: ["ts", "js", "json", "node"],
  moduleNameMapper: {
    "^@app/(.*)$": "<rootDir>/src/app/$1",
    "^@core/(.*)$": "<rootDir>/src/core/$1",
    "^@config/(.*)$": "<rootDir>/src/config/$1",
    "^@decorators/(.*)$": "<rootDir>/src/decorators/$1",
    "^@swagger/(.*)$": "<rootDir>/src/swagger/$1",
    "^@interfaces/(.*)$": "<rootDir>/src/interfaces/$1",
  },
};
