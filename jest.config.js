module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.tsx'],
    snapshotSerializers: ['enzyme-to-json/serializer']
};
