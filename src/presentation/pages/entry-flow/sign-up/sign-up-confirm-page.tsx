/* eslint-disable @typescript-eslint/no-unused-expressions */
import React, {useEffect, useState} from 'react';
import {useRecoilState, useRecoilValue} from 'recoil';
import {MdArrowForward} from 'react-icons/md';
import {SignUpConfirm} from 'domain/usecases';
import {Button} from 'presentation/components/button/button';
import {translations} from 'presentation/translations';
import {Title, Footer} from 'presentation/components/validated-password';
import {PasswordField} from 'presentation/components/text-field';
import {HeaderLogo, BackgroundImage} from 'presentation/components/layout';
import {signUpStates, tokenStates} from 'presentation/pages/states/atoms';
import {checkMasks, formatMasks} from 'presentation/utils';
import amplitude from 'amplitude-js';
import TagManager from 'react-gtm-module';
import {Modal} from 'presentation/components/modal';
import {MessageSuccessSignUp} from 'presentation/components/message-success-signup/message-success-signup';
import * as S from './styles';

type Props = {confirm: SignUpConfirm};

export const SignUpConfirmPage: React.FC<Props> = ({confirm}: Props) => {
	const tokenSt = useRecoilValue(tokenStates);
	const [state, setState] = useRecoilState(signUpStates);
	const [isOpenModalTerms, setIsOpenModalTerms] = useState(false);
	const [isCheckTerms, setIsCheckTerms] = useState(false);
	const [isOneTrustTriggered, setIsOneTrustTriggered] = useState(false);
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
			await confirm.signUpConfirm(
				state.id === '1'
					? {
							cpf: formatMasks('clear', state.userCode),
							cdUsuario: '',
							cdPessoa: tokenSt.cdPessoa,
							dsEmailLogin: state.email,
							cdSenha: state.confirmPassword,
							token: formatMasks('clear', tokenSt.token),
							celular: formatMasks('clear', state.phone),
					  }
					: {
							cpf: '',
							cdUsuario: formatMasks('clear', state.userCode),
							cdPessoa: tokenSt.cdPessoa,
							dsEmailLogin: state.email,
							cdSenha: state.confirmPassword,
							token: formatMasks('clear', tokenSt.token),
							celular: formatMasks('clear', state.phone),
					  },
			);
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
			errors.push('1 dígito, ');
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
			passwordInvalid: !checkMasks('password', state.password) || state.password === '',
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

	const readUseTerms = () => {
		setIsOpenModalTerms(!isOpenModalTerms);
		if (isOneTrustTriggered === false) {
			oneTrust(); // o script está no estático, index da public
			setIsOneTrustTriggered(true);
		}
		document.getElementById('otnotice-ea117f73-0350-4a28-b877-e21a2ee06e01').hidden = false;
	};

	const justCheckUseTerms = () => {
		if (isOneTrustTriggered === false) {
			oneTrust(); // o script está no estático, index da public
			setIsOneTrustTriggered(true);
		}
	};

	return (
		<S.Container>
			<S.Section>
				<HeaderLogo />
				<Title />

				<S.FormDiv>
					{!isOk ? (
						<>
							<PasswordField
								required
								maxLength={6}
								fontWeight={'bold'}
								spacingInsetX={'xs'}
								borderRadius={'nano'}
								label="Digite a senha:"
								placeholder="Digite sua senha"
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
								required
								maxLength={6}
								fontWeight={'bold'}
								spacingInsetX={'xs'}
								borderRadius={'nano'}
								label="Repita a senha:"
								placeholder="Digite sua senha"
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

							<S.ContainerTermsOfUse>
								<S.TermsOfUseContent>
									<S.TermsOfUseCheckbox
										checked={isCheckTerms}
										onChange={() => {
											setIsCheckTerms(!isCheckTerms);
											justCheckUseTerms();
										}}></S.TermsOfUseCheckbox>
									<p>
										{translations['pt-br'].termsOfUse.readAndAgree}
										<a onClick={() => readUseTerms()}>
											{translations['pt-br'].termsOfUse.termsOfUse}
										</a>
									</p>
								</S.TermsOfUseContent>
							</S.ContainerTermsOfUse>

							<Button
								onClick={handleSubmit}
								disabled={
									!isCheckTerms ||
									state.passwordInvalid ||
									state.confirmPasswordInvalid ||
									state.confirmPassword === ''
								}
								style={{marginTop: '1.25rem', justifySelf: 'end'}}
								rightIcon={<MdArrowForward />}>
								{translations['pt-br'].validatedCodePage.confirmButton}
							</Button>
						</>
					) : (
						<MessageSuccessSignUp />
					)}
				</S.FormDiv>

				<Footer />
			</S.Section>
			<S.ImageDiv>
				<BackgroundImage />
			</S.ImageDiv>
			<S.ContentModal>
				<Modal
					isOpen={isOpenModalTerms}
					style={{width: '85%'}}
					onClose={() => {
						setIsOpenModalTerms(!isOpenModalTerms);
						document.getElementById(
							'otnotice-ea117f73-0350-4a28-b877-e21a2ee06e01',
						).hidden = true;
					}}>
					<S.ModalContent>
						<div id="otnotice-ea117f73-0350-4a28-b877-e21a2ee06e01" hidden></div>
					</S.ModalContent>
				</Modal>
			</S.ContentModal>
		</S.Container>
	);
};
