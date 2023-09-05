import React from 'react';
import amplitude from 'amplitude-js';
import {SignIn} from 'domain/usecases';
import {forgotPasswordStates, signInStates} from 'presentation/pages/states/atoms';
import TagManager from 'react-gtm-module';
import {useNavigate} from 'react-router-dom';

import {useRecoilState, useSetRecoilState} from 'recoil';

import {translations} from 'presentation/translations';
import {Button} from 'presentation/components/button/button';
import {Title, Footer} from 'presentation/components/sign-in';
import {isCPF, formatMasks} from 'presentation/utils';
import {HeaderLogo, BackgroundImage} from 'presentation/components/layout';
import {TextField, PasswordField} from 'presentation/components/text-field';
import {Container, Section, ContainerForm, ForgotMyPassword, ContainerImage} from './styles';
import {accountDataState} from '../atoms';

type Props = {
	signIn: SignIn;
};

export const SignInPage: React.FC<Props> = ({signIn}: Props) => {
	const setAccountData = useSetRecoilState(accountDataState);
	const [state, setState] = useRecoilState(signInStates);
	const [forgotPasswordState, setForgotPasswordState] = useRecoilState(forgotPasswordStates);
	const navigate = useNavigate();

	const isDisabled = state.password === '' || state.userCode === '';

	const isLinkActive = (state.userCode !== '').toString();

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
		event.preventDefault();
		const tagManagerArgs = {
			gtmId: 'GTM-KQKN552',
			events: {
				sendUserInfo: 'Entrar seleção de contrato',
			},
		};
		TagManager.initialize(tagManagerArgs);
		amplitude.getInstance().logEvent('Entrar seleção de contrato');

		try {
			const {login_token} = await signIn.auth({
				identificador: state.id,
				senha: state.password,
				usuario: state.id === '3' ? state.userCode : formatMasks('clear', state.userCode),
			});
			setAccountData({login_token});
			setState({...state, isInvalid: false});
		} catch (error) {
			setState({...state, isInvalid: true, invalidMsg: error.message.body.detail});
		}
	};

	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement>,
		key: 'password' | 'userCode',
	) => {
		const {value} = e.target;
		setState({...state, [key]: value, isInvalid: false, invalidMsg: ''});
	};

	const applyMask = () => {
		let digits = formatMasks('clear', state.userCode);
		if (state.userCode.search('@') > 0) {
			setState({...state, userCode: state.userCode, id: '3'});
		} else if (state.userCode !== '' && digits.length < 11) {
			const rest = 11 - digits.length;
			for (let i = 0; i < rest; i += 1) {
				digits = `0${digits}`;
			}
			setState({...state, userCode: formatMasks('cpf', digits), id: '1'});
		} else if (isCPF(formatMasks('clear', state.userCode))) {
			setState({...state, userCode: formatMasks('cpf', state.userCode), id: '1'});
		} else {
			setState({...state, userCode: formatMasks('carteirinha', state.userCode), id: '2'});
		}
	};

	const navForgot = () => {
		setForgotPasswordState({...forgotPasswordState, userCode: state.userCode});
		const tagManagerArgs = {
			gtmId: 'GTM-KQKN552',
			events: {
				sendUserInfo: 'Esqueci senha',
			},
		};
		TagManager.initialize(tagManagerArgs);
		amplitude.getInstance().logEvent('Esqueci senha');
		navigate('/forgot-password');
	};

	return (
		<Container>
			<Section>
				<HeaderLogo />
				<Title />
				<ContainerForm onSubmit={handleSubmit}>
					<TextField
						required
						name="login"
						spacingInsetX={'xs'}
						borderRadius={'nano'}
						fontWeight={'regular'}
						label={translations['pt-br'].loginPage.loginTextFieldLabel}
						value={state.userCode}
						onChange={event => handleInputChange(event, 'userCode')}
						placeholder={translations['pt-br'].loginPage.loginTextFieldPlaceholder}
						isInvalid={state.isInvalid}
						onBlur={applyMask}
					/>
					<PasswordField
						required
						maxLength={6}
						name="password"
						spacingInsetX={'xs'}
						borderRadius={'nano'}
						fontWeight={'regular'}
						label={translations['pt-br'].loginPage.passwordTextFieldLabel}
						onChange={event => handleInputChange(event, 'password')}
						placeholder={translations['pt-br'].loginPage.passwordTextFieldPlaceholder}
						isInvalid={state.isInvalid}
						invalidMessage={state.invalidMsg}
					/>

					<ForgotMyPassword
						to="/forgot-password"
						active={isLinkActive}
						onClick={navForgot}>
						{translations['pt-br'].loginPage.forgotPassword}
					</ForgotMyPassword>
					<Button
						type="submit"
						spacingInsetY={'quarck'}
						style={{marginTop: '5vh'}}
						color="primary"
						disabled={isDisabled}
						fullWidth>
						{translations['pt-br'].loginPage.loginButton}
					</Button>
				</ContainerForm>
				<Footer />
			</Section>
			<ContainerImage>
				<BackgroundImage />
			</ContainerImage>
		</Container>
	);
};
