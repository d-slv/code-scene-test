import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {useRecoilState} from 'recoil';
import {MdArrowForward} from 'react-icons/md';
import {SignUpResendToken, SignUpValidateToken} from 'domain/usecases';
import {Button} from 'presentation/components/button/button';
import {TokenField} from 'presentation/components/text-field';
import {translations} from 'presentation/translations';
import {HeaderLogo, BackgroundImage} from 'presentation/components/layout';
import {Title, Footer} from 'presentation/components/validated-code';
import {tokenStates} from 'presentation/pages/states/atoms';
import {formatMasks} from 'presentation/utils';
import amplitude from 'amplitude-js';
import TagManager from 'react-gtm-module';
import * as S from './styles';

type Props = {
	resendToken: SignUpResendToken;
	validateToken: SignUpValidateToken;
};

export const SignUpTokenPage: React.FC<Props> = ({resendToken, validateToken}: Props) => {
	const [counter, setCounter] = useState(20);
	const [timer, setTimer] = useState('');
	const [state, setState] = useRecoilState(tokenStates);
	const navigate = useNavigate();

	useEffect(() => {
		if (counter > 0) {
			setTimeout(() => setCounter(counter - 1), 1000);
			if (counter >= 60) {
				setTimer(`Aguarde 1m ${counter - 60}s`);
			} else {
				setTimer(`Aguarde ${counter}s`);
			}
		} else {
			setTimer(translations['pt-br'].validatedPasswordPage.resendButton);
		}
	});

	useEffect(() => {
		document.title = translations['pt-br'].validatedPasswordPage.headTitle;
	}, []);

	const resendTk = async () => {
		const tagManagerArgs = {
			gtmId: 'GTM-KQKN552',
			events: {
				sendUserInfo: 'Reenviar código',
			},
		};

		TagManager.initialize(tagManagerArgs);
		amplitude.getInstance().logEvent('Reenviar código');

		try {
			await resendToken.signUpResendToken({
				cdPessoa: state.cdPessoa,
			});
		} catch (error) {
			setState({
				...state,
				tokenInvalid: true,
				tokenInvalidMsg: error.message.body.detail,
			});
		}
		setCounter(20);
	};

	const validateTk = async (): Promise<void> => {
		const tagManagerArgs = {
			gtmId: 'GTM-KQKN552',
			events: {
				sendUserInfo: 'Validar código',
			},
		};
		TagManager.initialize(tagManagerArgs);
		amplitude.getInstance().logEvent('Validar código');
		try {
			await validateToken.get({
				cdToken: formatMasks('clear', state.token),
				cdPessoa: state.cdPessoa,
			});
			navigate('/confirm');
		} catch (error) {
			setState({
				...state,
				tokenInvalid: true,
				tokenInvalidMsg: error.message.body.detail,
			});
		}
	};

	useEffect(() => {
		if (state.token.search(/[A-Za-z]/) >= 0) {
			setState({
				...state,
				tokenInvalid: true,
				tokenInvalidMsg: 'Deve conter apenas números.',
			});
		} else if (state.token.length < 8 && state.token.length > 0) {
			setState({...state, tokenInvalid: true, tokenInvalidMsg: 'Deve conter 7 dígitos.'});
		} else {
			setState({...state, tokenInvalid: false, tokenInvalidMsg: ''});
		}
	}, [state.token]);

	return (
		<S.Container>
			<S.Section>
				<HeaderLogo />
				<Title />
				<S.FormDiv>
					<TokenField
						required
						spacingInsetX={'xs'}
						borderRadius={'nano'}
						fontWeight={'regular'}
						label="Digite o código que você recebeu:"
						placeholder="0000 - 000"
						value={state.token}
						maxLength={8}
						onChange={event =>
							setState({
								...state,
								token: formatMasks('token', event.target.value),
								tokenInvalid: false,
								tokenInvalidMsg: '',
							})
						}
						isInvalid={state.tokenInvalid}
						invalidMessage={state.tokenInvalidMsg}
					/>
					<S.CodeButtons>
						<Button
							type="button"
							variant="outlined"
							onClick={resendTk}
							style={{marginTop: '1.25rem', justifySelf: 'end'}}>
							{timer}
						</Button>
						<Button
							onClick={validateTk}
							style={{marginTop: '1.25rem', justifySelf: 'end'}}
							disabled={!state.token}
							rightIcon={<MdArrowForward />}>
							{translations['pt-br'].validatedPasswordPage.validateButton}
						</Button>
					</S.CodeButtons>
				</S.FormDiv>
				<Footer />
			</S.Section>
			<S.ImageDiv>
				<BackgroundImage />
			</S.ImageDiv>
		</S.Container>
	);
};
