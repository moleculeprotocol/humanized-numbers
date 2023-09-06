/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  //https://github.com/jestjs/jest/issues/11617
  workerThreads: true,
  maxWorkers: 1
}
