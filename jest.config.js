module.exports = {
	testEnvironment: 'node',
	moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
	transform: {
		'^.+\\.tsx?$': 'ts-jest',
	},
	testMatch: ['**/test/**/*.test.(ts|tsx|js|jsx)'],
	setupFiles: ['./test/setup.js'], // Ruta correcta al archivo de configuración de mocks

	globals: {
		'ts-jest': {
			tsconfig: './tsconfig.json',
		},
	},
};
