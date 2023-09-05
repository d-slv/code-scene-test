import React, {memo} from 'react';
import {Link} from 'react-router-dom';
import {useResetRecoilState} from 'recoil';
import {signInStates} from 'presentation/pages/states/atoms';
import {translations} from 'presentation/translations';
import * as S from './styles';

const ValidatedPasswordFooter: React.FC = () => {
	const resetState = useResetRecoilState(signInStates);
	return (
		<S.Footer>
			<Link to="/login">
				<a onClick={() => resetState()}>
					{translations['pt-br'].validatedPasswordPage.backToLogin}
					<b>{translations['pt-br'].validatedPasswordPage.backToLoginContinue}</b>
				</a>
			</Link>
		</S.Footer>
	);
};

export default memo(ValidatedPasswordFooter);
