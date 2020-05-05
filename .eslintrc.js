module.exports = {
	extends: ['airbnb', 'prettier', 'prettier/react'],
	plugins: ['prettier', 'jest', 'cypress'],
	parser: 'babel-eslint',
	env: {
		browser: true,
		'cypress/globals': true,
		es6: true,
		'jest/globals': true,
	},
	settings: {
		react: {
			version: 'detect',
		},
	},
	rules: {
		'prettier/prettier': 'warn',
	},
};
