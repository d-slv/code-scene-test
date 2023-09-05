import React, {memo} from 'react';
import * as S from './styles';

const HeaderLogo: React.FC = () => (
	<S.DivLogo>
		<S.Logo />
	</S.DivLogo>
);

export default memo(HeaderLogo);
