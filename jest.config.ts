export default {
	moduleFileExtensions: ['js', 'json', 'ts'],
	rootDir: '',
	testRegex: '.*\\.spec\\.ts$',
	preset: 'ts-jest/presets/default-esm',
	extensionsToTreatAsEsm: ['.ts'],
	globals: {
		'ts-jest': {
			useESM: true,
			isolatedModules: true,
		},
	},
	transform: {
		'^.+\\.ts$': [
			'ts-jest',
			{
				useESM: true,
				tsconfig: {
					module: 'esnext',
				},
			},
		],
	},
	transformIgnorePatterns: ['node_modules/(?!.*\\.mjs$)'],
	moduleNameMapper: {
		'^(\\.{1,2}/.*)\\.js$': '$1',
	},
	collectCoverageFrom: ['**/*.(t|j)s'],
	coverageDirectory: '../coverage',
	testEnvironment: 'node',
};
