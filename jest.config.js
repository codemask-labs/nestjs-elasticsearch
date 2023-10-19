module.exports = {
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
    testPathIgnorePatterns: ['<rootDir>/src/test'],
    moduleFileExtensions: ['cjs', 'js', 'ts'],
    modulePaths: ['<rootDir>', 'src'],
    moduleNameMapper: {
        '^lib/(.*)$': ['<rootDir>/src/lib/$1'],
        '^nestjs/(.*)$': ['<rootDir>/src/nestjs/$1'],
        '^test/(.*)$': ['<rootDir>/src/test/$1']
    },
    rootDir: '.',
    testRegex: '.spec.ts$',
    transform: {
        '^.+\\.ts$': 'ts-jest'
    },
    restoreMocks: true,
    resetMocks: true
}
