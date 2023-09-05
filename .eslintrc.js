module.exports = {
	root: true,
	parser: '@typescript-eslint/parser',
	parserOptions: {
		project: ['./tsconfig.json'],
		ecmaVersion: 2020,
		sourceType: 'module',
		ecmaFeatures: {
			jsx: true,
			js: true
		},
	},
	settings: {
		react: {
			version: 'detect',
		},
		'import/extensions': ['.js', '.jsx', '.ts', '.tsx'],
		'import/parsers': {
			'@typescript-eslint/parser': ['.ts', '.tsx'],
		},
		'import/resolver': {
			node: {
				extensions: ['.js', '.jsx', '.ts', '.tsx'],
			},
		},
	},
	extends: [
		'airbnb-base',
		'airbnb-typescript/base',
		'plugin:react/recommended',
		'plugin:@typescript-eslint/recommended',
		'prettier',
		'plugin:storybook/recommended',
	],
	plugins: ['prettier'],
	rules: {
		'prettier/prettier': 'error',
		'no-param-reassign': [
			'error',
			{
				props: true,
				ignorePropertyModificationsFor: ['draft', 'draftState', 'acc'],
			},
		],
		'no-shadow': 'off',
		'@typescript-eslint/no-shadow': ['error'],
		'@typescript-eslint/no-use-before-define': 'off',
		'@typescript-eslint/explicit-function-return-type': 'off',
		'react/display-name': 'off',
		'@typescript-eslint/naming-convention': 'off',
		'@typescript-eslint/camelcase': 'off',
		'react-hooks/exhaustive-deps': 'off',
		'react/prop-types': 'off',
		'import/prefer-default-export': 'off',
		'import/no-extraneous-dependencies': 'off',
		'no-underscore-dangle': [
			'error',
			{
				allow: ['typename_', '_typename'],
				allowAfterThis: true,
				allowAfterSuper: true,
				allowAfterThisConstructor: true,
			},
		],		
		'import/extensions': [
			'error',
			'ignorePackages',
			{
				js: 'never',
				jsx: 'never',
				ts: 'never',
				tsx: 'never',
			},
		],
	},
};
