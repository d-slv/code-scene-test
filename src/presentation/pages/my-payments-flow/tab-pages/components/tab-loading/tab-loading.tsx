import * as React from 'react';
import {logoHapvida as Logo} from 'presentation/components/icons/';
import {LogoContainer} from './tab-loading.styles';

const TabLoading = () => (
	<LogoContainer>
		<Logo height={110} width={110} fillLogoName="" useLogoName={false} size100percent={true} />
	</LogoContainer>
);

export default TabLoading;
