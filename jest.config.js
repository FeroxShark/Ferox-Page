module.exports = {
  testEnvironment: 'jsdom',
  setupFiles: ['./jest.setup.js'],
  setupFilesAfterEnv: ['@testing-library/jest-dom', './jest.after.js'],
  transform: {
    '^.+\\.(js|jsx|mdx)$': 'babel-jest'
  },
  moduleFileExtensions: ['js', 'jsx', 'mdx']
};
