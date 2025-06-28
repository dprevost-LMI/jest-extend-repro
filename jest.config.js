module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  
  // This will inject Jest globals into the global scope
  // so you don't need to import them
  injectGlobals: true,
  
  // Optional: specify test file patterns
  testMatch: [
    '**/__tests__/**/*.(js|jsx|ts|tsx)',
    '**/*.(test|spec).(js|jsx|ts|tsx)',
    '**/test.ts'  // Include your specific test file
  ],
  
  // Transform TypeScript files
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  
  // File extensions to recognize
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  
  // Setup file for extending Jest matchers
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts']
};
