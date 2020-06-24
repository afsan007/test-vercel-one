module.exports = {
  clearMocks: true,
  coverageDirectory: 'coverage',
  testEnvironment: 'jsdom',

  setupFilesAfterEnv: ['jest-extended'],
  setupFiles: ['./src/setupTests.ts'],

  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
  testRegex: '\\.test\\.tsx?$',
};
