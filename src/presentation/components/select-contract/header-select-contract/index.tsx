import React, {memo} from 'react';

import {Header, Logo} from './styles';

const HeaderSelectContract: React.FC = () => (
	<Header>
		<Logo />
	</Header>
);

export default memo(HeaderSelectContract);
