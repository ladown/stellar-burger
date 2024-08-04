import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  },
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  moduleNameMapper: {
    '^@pages(.*)$': '<rootDir>/src/pages$1',
    '^@components(.*)$': '<rootDir>/src/components$1',
    '^@ui(.*)$': '<rootDir>/src/components/ui$1',
    '^@utils(.*)$': '<rootDir>/src/utils$1',
    '^@utils-types(.*)$': '<rootDir>/src/utils/types$1',
    '^@api(.*)$': '<rootDir>/src/utils/burger-api.ts',
    '^@services(.*)$': '<rootDir>/src/services$1',
    '^@slices(.*)$': '<rootDir>/src/services/slices$1',
    '^@store(.*)$': '<rootDir>/src/services/store.ts',
    '^@hooks(.*)$': '<rootDir>/src/hooks$1'
  }
};

export default config;
