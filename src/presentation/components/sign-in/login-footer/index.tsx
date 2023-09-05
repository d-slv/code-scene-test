import React, {memo} from 'react';
import {Link} from 'react-router-dom';
import {useResetRecoilState} from 'recoil';
import amplitude from 'amplitude-js';
import TagManager from 'react-gtm-module';
import {signInStates} from 'presentation/pages/states/atoms';
import {translations} from 'presentation/translations';
import * as S from './styles';

const LoginFooter: React.FC = () => {
	const resetState = useResetRecoilState(signInStates);

	return (
		<S.Footer>
			<Link to="/cadastro">
				<S.CreateAccount>
					{translations['pt-br'].loginPage.isNotRegistered}
					<b
						onClick={() => {
							resetState();
							const tagManagerArgs = {
								gtmId: 'GTM-KQKN552',
								events: {
									sendUserInfo: 'Criar conta',
								},
							};

							TagManager.initialize(tagManagerArgs);
							amplitude.getInstance().logEvent('Criar conta');
						}}>
						{translations['pt-br'].loginPage.createYourAccount}
					</b>
				</S.CreateAccount>
			</Link>
		</S.Footer>
	);
};

export default memo(LoginFooter);
