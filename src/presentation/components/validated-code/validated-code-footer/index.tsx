import React, {memo} from 'react';
import {Link} from 'react-router-dom';
import {useResetRecoilState} from 'recoil';
import {signInStates, signUpStates, forgotPasswordStates} from 'presentation/pages/states/atoms';
import {translations} from 'presentation/translations';
import * as S from './styles';

const ValidatedCodeFooter: React.FC = () => {
	const resetSI = useResetRecoilState(signInStates);
	const resetSU = useResetRecoilState(signUpStates);
	const resetFP = useResetRecoilState(forgotPasswordStates);
	return (
		<S.Footer>
			<Link to="/login">
				<a
					onClick={() => {
						resetSI();
						resetSU();
						resetFP();
					}}>
					{translations['pt-br'].validatedPasswordPage.backToLogin}
					<b>{translations['pt-br'].validatedPasswordPage.backToLoginContinue}</b>
				</a>
			</Link>
		</S.Footer>
	);
};

export default memo(ValidatedCodeFooter);
