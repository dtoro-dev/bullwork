module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  testMatch: ['**/tests/**/*.test.ts'],
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
};