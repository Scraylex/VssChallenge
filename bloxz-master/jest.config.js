module.exports = {
  clearMocks: true,
  collectCoverageFrom: [
    'src/**/*.ts',
    'src/**/*.tsx',
    '!src/*.tsx',
    '!src/**/index.ts',
    '!src/shared/**/*.ts',
    '!src/shared/**/*.tsx',
    '!src/**/constants.ts',

    // Custom ignored files
    '!src/app/elements/InputDateTime/InputDateTime.tsx',
    '!src/app/elements/InputPhoto/InputPhoto.tsx',
    '!src/app/modules/EventModify/EventModify.tsx',
  ],

  coverageThreshold: {
    'src/**/*.ts': {
      branches: 75,
      functions: 75,
      lines: 75,
      statements: 75,
    },

    'src/**/*.tsx': {
      branches: 75,
      functions: 75,
      lines: 75,
      statements: 75,
    },
  },
  // The root of your source code, typically /src
  roots: ['src'],

  modulePaths: ['src'],

  // Jest transformations -- this adds support for TypeScript
  // using ts-jest
  transform: {
    '^.+\\.(js|ts|jsx|tsx)$': 'ts-jest',
  },

  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/src/mocks/fileMock.js',
    '\\.(css|less)$': '<rootDir>/src/mocks/styleMock.js',
  },

  // Runs special logic, such as cleaning up components
  // when using React Testing Library and adds special
  // extended assertions to Jest
  setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect', '<rootDir>/src/mocks/localStorageMock.js'],

  // Test spec file resolution pattern
  // Matches parent folder `__tests__` and filename
  // should contain `test` or `spec`.
  testRegex: '\\.(test)\\.(ts|tsx)$',

  // Module file extensions for importing
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],

  testPathIgnorePatterns: ['/node_modules/'],

  transformIgnorePatterns: ['node_modules/(?!(@ionic)/)'],
}
