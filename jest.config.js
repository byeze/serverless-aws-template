/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  testEnvironment: 'node',
  testMatch: ['**/*.spec.ts', '**/*.test.ts'],
  coverageDirectory: 'coverage',
  coverageReporters: ['json-summary', 'clover'],
  transform: {
    '^.+.tsx?$': ['ts-jest', {}],
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  roots: ['src'],
  rootDir: './',
  // coverageThreshold: {
  //   global: {
  //     statements: 65,
  //     branches: 37,
  //     functions: 47,
  //     lines: 64,
  //   },
  // },
};
