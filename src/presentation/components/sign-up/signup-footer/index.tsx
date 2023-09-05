import React, {memo} from 'react';
import {Link} from 'react-router-dom';
import {useResetRecoilState} from 'recoil';
import {signUpStates} from 'presentation/pages/states/atoms';
import {translations} from 'presentation/translations';
import * as S from './styles';

const SingUpFooter: React.FC = () => {
	const resetState = useResetRecoilState(signUpStates);

	return (
		<S.Footer>
			<Link to="/login">
				{translations['pt-br'].signUpPage.backToLogin}
				<b onClick={() => resetState()}>
					{translations['pt-br'].signUpPage.backToLoginContinue}
				</b>
			</Link>
		</S.Footer>
	);
};

export default memo(SingUpFooter);
