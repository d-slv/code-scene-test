import ReactDOM from 'react-dom';
import React from 'react';
import {ThemeProvider} from 'styled-components';
import amplitude from 'amplitude-js';
import TagManager from 'react-gtm-module';
import ReactGA from 'react-ga';
import {RecoilRoot} from 'recoil';

import {Router} from './routes/router';
import theme from '../presentation/styles/theme.styles';
import GlobalStyles from '../presentation/styles/global.styles';

ReactGA.initialize('G-GZYCDNSQC7');
ReactGA.pageview(window.location.pathname + window.location.search);
const tagManagerArgs = {
	gtmId: 'GTM-KQKN552',
};

TagManager.initialize(tagManagerArgs);
amplitude.getInstance().init('198aaf89111be1ccc235da2ef294202f');

ReactDOM.render(
	<ThemeProvider theme={theme}>
		<RecoilRoot>
			<Router />
		</RecoilRoot>
		<GlobalStyles />
	</ThemeProvider>,
	document.getElementById('main'),
);
