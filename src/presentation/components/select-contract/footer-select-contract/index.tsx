import React, {memo} from 'react';

import {Footer, DivLogo, AnsLogo, AnsRegisterCode} from './styles';

const FooterSelectContract: React.FC = () => (
	<Footer>
		<DivLogo>
			<AnsLogo />
			<AnsRegisterCode />
		</DivLogo>
	</Footer>
);
export default memo(FooterSelectContract);
