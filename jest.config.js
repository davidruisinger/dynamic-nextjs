module.exports = {
  preset: 'ts-jest/presets/js-with-ts',
  testEnvironment: 'node',
  testPathIgnorePatterns: ['<rootDir>/build/', '<rootDir>/node_modules/'],
  testMatch: ['**/?(*.)+(spec|test).[jt]s?(x)'],
  setupFiles: ['<rootDir>/jest.setup.js'],
  collectCoverage: true,
  globals: {
    'ts-jest': {
      tsConfig: 'tsconfig.json',
    },
  },
}
