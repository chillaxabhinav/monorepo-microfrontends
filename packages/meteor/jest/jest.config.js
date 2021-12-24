const path = require('path');

module.exports = {
    testEnvironment: 'jsdom',
    rootDir: path.resolve(process.cwd()),
    transform: {
        '.+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$': 'jest-transform-stub',
        '^.+\\.(js|jsx|ts|tsx)?$': [ 'babel-jest', { configFile: path.resolve(__dirname, './babel.config.js') }]
    },
    coverageDirectory: '<rootDir>/coverage/',
    collectCoverageFrom: [
        '<rootDir>/src/**/*.{js,jsx,ts,tsx}',
        '!<rootDir>/src/index.tsx'
    ],
    moduleNameMapper: {
        "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga|css|scss|sass)$": path.resolve(__dirname, 'commonMocks/fileMock.js')
    },
    watchPathIgnorePatterns: ['node_modules'],
    transformIgnorePatterns: ['<rootDir>/node_modules/']
};