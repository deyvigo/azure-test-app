module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    '^.+\\.ts$': ['ts-jest', {
      tsconfig: 'tsconfig.json', // Puedes especificar un archivo tsconfig si lo necesitas
    }]
  }
}