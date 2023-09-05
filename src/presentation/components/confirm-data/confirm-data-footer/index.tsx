import React, {memo} from 'react';
import {Link} from 'react-router-dom';
import {useResetRecoilState} from 'recoil';
import amplitude from 'amplitude-js';
import TagManager from 'react-gtm-module';
import ReactGA from 'react-ga';
import {forgotPasswordStates, signInStates, signUpStates} from 'presentation/pages/states/atoms';
import {translations} from 'presentation/translations';
import * as S from './styles';

const ConfirmDataFooter: React.FC = () => {
	const resetSI = useResetRecoilState(signInStates);
	const resetSU = useResetRecoilState(signUpStates);
	const resetFP = useResetRecoilState(forgotPasswordStates);

	return (
		<S.Footer>
			<Link to="/login">
				<a
					onClick={() => {
						ReactGA.event({
							category: 'Login',
							action: 'Retornar Login',
						});
						const tagManagerArgs = {
							gtmId: 'GTM-KQKN552',
							events: {
								sendUserInfo: 'Retornar Login',
							},
						};

						TagManager.initialize(tagManagerArgs);
						amplitude.getInstance().logEvent('Retornar Login');
						resetSI();
						resetSU();
						resetFP();
					}}>
					{translations['pt-br'].confirmDataPage.backToLogin}
					<b>{translations['pt-br'].confirmDataPage.backToLoginContinue}</b>
				</a>
			</Link>
		</S.Footer>
	);
};

export default memo(ConfirmDataFooter);
