/* eslint-disable no-console */
/* eslint-disable no-alert */
import React, {useEffect, useState} from 'react';
import {MdArrowForward} from 'react-icons/md';
import {useRecoilState} from 'recoil';
import {useNavigate} from 'react-router-dom';
import {SignUpCheckExistence, SignUpSendToken} from 'domain/usecases';
import {translations} from 'presentation/translations';
import {Title, Footer} from 'presentation/components/sign-up';
import {TextField} from 'presentation/components/text-field';
import {HeaderLogo, BackgroundImage} from 'presentation/components/layout';
import {Button} from 'presentation/components/button/button';
import {signUpStates, tokenStates} from 'presentation/pages/states/atoms';
import {checkMasks, formatMasks, isCPF} from 'presentation/utils';
import * as S from './styles';

type Props = {
	checkExistence: SignUpCheckExistence;
	validateSignUp: SignUpSendToken;
};

export const SignUpPage: React.FC<Props> = ({checkExistence, validateSignUp}: Props) => {
	const [tokenSt, setTokenSt] = useRecoilState(tokenStates);
	const [state, setState] = useRecoilState(signUpStates);
	const [max, setMax] = useState(18);
	const navigate = useNavigate();

	useEffect(() => {
		document.title = translations['pt-br'].signUpPage.headTitle;
	}, []);

	const existence = async (): Promise<void> => {
		try {
			setState(old => ({...old, isLoading: true}));
			await checkExistence.signUpCheckExistence({
				cdUsuario: state.id === '2' ? formatMasks('clear', state.userCode) : '',
				cpf: state.id === '1' ? formatMasks('clear', state.userCode) : '',
			});
		} catch (error) {
			setState(old => ({
				...old,
				isInvalid: true,
				userCodeInvalidMsg: error.message.body.detail,
			}));
		}
	};

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
		event.preventDefault();
		try {
			const validateRegistryResult = await validateSignUp.signUpSendToken({
				cdUsuario: state.id === '2' ? formatMasks('clear', state.userCode) : '',
				cpf: state.id === '1' ? formatMasks('clear', state.userCode) : '',
				dtNascimento: state.birthday,
				celular: formatMasks('clear', state.phone),
				dsEmailLogin: state.email,
				dsEmailLoginConfirmacao: state.email,
				identificador: state.id,
			});
			setTokenSt({...tokenSt, cdPessoa: validateRegistryResult.cdPessoa});
			navigate('/sendtoken', {replace: true});
		} catch (error) {
			setState({
				...state,
				isInvalid: true,
				emailInvalidMsg: error.message.body.detail,
			});
		}
	};

	useEffect(() => {
		if (isCPF(formatMasks('clear', state.userCode))) {
			setMax(12);
			setState({...state, userCode: formatMasks('cpf', state.userCode), id: '1'});
		} else {
			setMax(18);
			setState({...state, userCode: formatMasks('carteirinha', state.userCode), id: '2'});
		}
	}, [state.userCode]);

	function checkDate() {
		if (state.birthday !== '') {
			const ck = !checkMasks('date', state.birthday);
			setState({
				...state,
				isInvalid: ck,
				birthdayInvalidMsg: ck ? 'Data inválida!' : '',
			});
		}
	}

	function checkPhone() {
		if (state.phone !== '') {
			const ck = !checkMasks('phone', state.phone);
			setState({
				...state,
				isInvalid: ck,
				phoneInvalidMsg: ck ? 'Número inválido!' : '',
			});
		}
	}
	function checkEmail() {
		if (state.email !== '') {
			const ck = !checkMasks('email', state.email);
			setState({
				...state,
				isInvalid: ck,
				emailInvalidMsg: ck ? 'Email inválido!' : '',
			});
		}
	}

	return (
		<S.Container>
			<S.Section>
				<HeaderLogo />
				<Title />
				<S.ContainerForm onSubmit={handleSubmit}>
					<TextField
						required
						spacingInsetX={'xs'}
						borderRadius={'nano'}
						fontWeight={'regular'}
						label="Dados do seu plano Hapvida:"
						placeholder="Use o CPF ou número da carteirinha"
						value={state.userCode}
						maxLength={max}
						onChange={event =>
							setState({
								...state,
								userCode: event.target.value,
								isInvalid: false,
								userCodeInvalidMsg: '',
							})
						}
						isInvalid={state.isInvalid}
						invalidMessage={state.userCodeInvalidMsg}
						onBlur={existence}
					/>
					<S.DoubleInput>
						<TextField
							required
							spacingInsetX={'xs'}
							borderRadius={'nano'}
							fontWeight={'regular'}
							label="Data de nascimento:"
							placeholder="00/00/0000"
							maxLength={10}
							value={state.birthday}
							onChange={event =>
								setState({
									...state,
									birthday: formatMasks('date', event.target.value),
									isInvalid: false,
									birthdayInvalidMsg: '',
								})
							}
							isInvalid={state.isInvalid}
							invalidMessage={state.birthdayInvalidMsg}
							onBlur={checkDate}
							onMouseLeave={() => {
								checkDate();
							}}
						/>
						<TextField
							required
							spacingInsetX={'xs'}
							borderRadius={'nano'}
							fontWeight={'regular'}
							label="Número de celular:"
							placeholder="(00) 00000-0000"
							maxLength={15}
							value={state.phone}
							onChange={event =>
								setState({
									...state,
									phone: formatMasks('phone', event.target.value),
									isInvalid: false,
									phoneInvalidMsg: '',
								})
							}
							isInvalid={state.isInvalid}
							invalidMessage={state.phoneInvalidMsg}
							onBlur={checkPhone}
							onMouseLeave={() => {
								checkPhone();
							}}
						/>
					</S.DoubleInput>
					<TextField
						label="E-mail:"
						required
						placeholder="email@gmail.com"
						value={state.email}
						onChange={event =>
							setState({
								...state,
								email: event.target.value.toLowerCase(),
								isInvalid: false,
								emailInvalidMsg: '',
							})
						}
						isInvalid={state.isInvalid}
						invalidMessage={state.emailInvalidMsg}
						onBlur={checkEmail}
						onMouseLeave={() => {
							checkEmail();
						}}
					/>
					<Button
						type="submit"
						style={{marginTop: '1.25rem', justifySelf: 'end'}}
						rightIcon={<MdArrowForward />}>
						{translations['pt-br'].signUpPage.continueButton}
					</Button>
				</S.ContainerForm>
				<Footer />
			</S.Section>
			<S.ContainerImage>
				<BackgroundImage />
			</S.ContainerImage>
		</S.Container>
	);
};
