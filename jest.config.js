// jest.config.js
const path = require('path');

module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    rootDir: path.join(__dirname, 'src'),
    moduleNameMapper: {
        '@src\/(.*)$': '<rootDir>/$1.ts',
    },
    testMatch: ['**/__tests__/**/*.[jt]s?(x)'],
};
