// FlowPilot v1.0.0 — Jest config.
// Uses next/jest for Next.js integration with jsdom environment.
// Requires --forceExit if @base-ui/react causes open handle warnings.
// Do NOT modify without running: npm test

import nextJest from 'next/jest.js'

const createJestConfig = nextJest({
  dir: './',
})

const customJestConfig = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
}

// next/jest types require all Jest config properties; cast to allow partial config
export default createJestConfig(
  customJestConfig as Parameters<typeof createJestConfig>[0],
)
