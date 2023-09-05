/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable no-console */
/* eslint-disable no-alert */
import React, {useEffect, useState} from 'react';
import {useRecoilState, useRecoilValue} from 'recoil';
import {MdArrowForward} from 'react-icons/md';
import {ForgotPasswordConfirm} from 'domain/usecases';
import {Button} from 'presentation/components/button/button';
import {translations} from 'presentation/translations';
import {Title, Footer} from 'presentation/components/validated-password';
import {PasswordField} from 'presentation/components/text-field';
import {HeaderLogo, BackgroundImage} from 'presentation/components/layout';
import {forgotPasswordStates, tokenStates} from 'presentation/pages/states/atoms';
import {checkMasks, formatMasks} from 'presentation/utils';
import amplitude from 'amplitude-js';
import TagManager from 'react-gtm-module';
import {MessageSuccessForgotPassword} from 'presentation/components/message-success-forgot-password/message-success-forgot-password';
import * as S from './styles';

type Props = {confirmForgotPassword: ForgotPasswordConfirm};

export const ForgotPasswordConfirmPage: React.FC<Props> = ({confirmForgotPassword}: Props) => {
	const tokenSt = useRecoilValue(tokenStates);
	const [state, setState] = useRecoilState(forgotPasswordStates);
	const [isOk, setIsOk] = useState(false);

	useEffect(() => {
		document.title = translations['pt-br'].validatedCodePage.headTitle;
	}, []);

	const handleSubmit = async (): Promise<void> => {
		const tagManagerArgs = {
			gtmId: 'GTM-KQKN552',
			events: {
				sendUserInfo: 'Finalizar senha',
			},
		};

		TagManager.initialize(tagManagerArgs);
		amplitude.getInstance().logEvent('Finalizar senha');

		try {
			await confirmForgotPassword.forgotPasswordConfirm({
				cdPessoa: tokenSt.cdPessoa,
				cdSenha: state.password,
				contraSenha: state.confirmPassword,
				token: formatMasks('clear', tokenSt.token),
			});
			setIsOk(true);
		} catch (error) {
			setState({
				...state,
				confirmPasswordInvalid: true,
				confirmPasswordInvalidMsg: error.message.body.detail,
			});
		}
	};

	function validatePassword(value: string) {
		const errors = [];
		errors.push('Sua senha deve conter pelo menos: ');
		if (value.length < 6) {
			errors.push('6 caracteres, ');
		}
		if (value.search(/[a-z]/) < 0) {
			errors.push('1 letra, ');
		}
		if (value.search(/d/i) < 0) {
			errors.push('1 número, ');
		}
		if (value.search(/[A-Z]/) < 0) {
			errors.push('1 letra maiúscula, ');
		}
		if (value.search(/[$*&@#!]/i) < 0) {
			errors.push('1 destes símbolos: ! $ * & @ # ');
		}
		return errors.join('');
	}

	useEffect(() => {
		setState({
			...state,
			passwordInvalid: !checkMasks('password', state.password) && state.password !== '',
			passwordInvalidMsg: !state.passwordInvalid ? validatePassword(state.password) : '',
		});
	}, [state.password]);

	useEffect(() => {
		state.password !== state.confirmPassword
			? setState({
					...state,
					confirmPasswordInvalid: true,
					confirmPasswordInvalidMsg: 'As senhas não são iguais!',
			  })
			: setState({...state, confirmPasswordInvalid: false, confirmPasswordInvalidMsg: ''});
	}, [state.confirmPassword]);

	return (
		<S.Container>
			<S.Section>
				<HeaderLogo />

				<Title />
				<S.FormDiv>
					{!isOk ? (
						<>
							<PasswordField
								label="Digite a senha:"
								required
								placeholder="Digite sua senha"
								maxLength={6}
								value={state.password}
								onChange={event =>
									setState({
										...state,
										password: event.target.value,
										passwordInvalid: false,
										passwordInvalidMsg: '',
									})
								}
								isInvalid={state.passwordInvalid}
								invalidMessage={state.passwordInvalidMsg}
							/>
							<PasswordField
								label="Repita a senha:"
								required
								placeholder="Digite sua senha"
								maxLength={6}
								value={state.confirmPassword}
								onChange={event => {
									setState({
										...state,
										confirmPassword: event.target.value,
										confirmPasswordInvalid: false,
										confirmPasswordInvalidMsg: '',
									});
								}}
								isInvalid={state.confirmPasswordInvalid}
								invalidMessage={state.confirmPasswordInvalidMsg}
							/>
							<Button
								onClick={handleSubmit}
								style={{marginTop: '1.25rem', justifySelf: 'end'}}
								rightIcon={<MdArrowForward />}>
								{translations['pt-br'].validatedCodePage.confirmButton}
							</Button>
						</>
					) : (
						<MessageSuccessForgotPassword />
					)}
				</S.FormDiv>

				<Footer />
			</S.Section>
			<S.ImageDiv>
				<BackgroundImage />
			</S.ImageDiv>
		</S.Container>
	);
};
