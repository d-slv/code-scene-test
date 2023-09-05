import {ThemeProvider} from 'styled-components';
import GlobalStyle from '../src/presentation/styles/global.styles';
import theme from '../src/presentation/styles/theme.styles';

export const parameters = {
	actions: {argTypesRegex: '^on[A-Z].*'},
	controls: {
		matchers: {
			color: /(background|color)$/i,
			date: /Date$/,
		},
	},
};

export const decorators = [
	Story => (
		<ThemeProvider theme={theme}>
			<Story />
			<GlobalStyle />
		</ThemeProvider>
	),
];
