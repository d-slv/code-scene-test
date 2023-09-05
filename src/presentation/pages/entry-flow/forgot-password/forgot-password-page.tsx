/* eslint-disable no-console */
/* eslint-disable no-alert */
import React, {useEffect, useState} from 'react';
import {MdArrowForward} from 'react-icons/md';
import {useRecoilState} from 'recoil';
import {useNavigate} from 'react-router-dom';
import {ForgotPasswordRecoverUserInfo} from 'domain/usecases';
import {translations} from 'presentation/translations';
import {Title, Footer} from 'presentation/components/confirm-data';
import {TextField} from 'presentation/components/text-field';
import {HeaderLogo, BackgroundImage} from 'presentation/components/layout';
import {Button} from 'presentation/components/button/button';
import {forgotPasswordStates, tokenStates} from 'presentation/pages/states/atoms';
import {checkMasks, formatMasks, isCPF} from 'presentation/utils';
import amplitude from 'amplitude-js';
import TagManager from 'react-gtm-module';
import * as S from './styles';

type Props = {
	recoverUserInfo: ForgotPasswordRecoverUserInfo;
};

export const ForgotPasswordPage: React.FC<Props> = ({recoverUserInfo}: Props) => {
	const [token, setToken] = useRecoilState(tokenStates);
	const [state, setState] = useRecoilState(forgotPasswordStates);
	const [max, setMax] = useState(18);
	const navigate = useNavigate();

	useEffect(() => {
		document.title = translations['pt-br'].confirmDataPage.headTitle;
	}, []);

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
		const tagManagerArgs = {
			gtmId: 'GTM-KQKN552',
			events: {
				sendUserInfo: 'Próxima Etapa',
			},
		};
		TagManager.initialize(tagManagerArgs);
		amplitude.getInstance().logEvent('Próxima Etapa');
		event.preventDefault();

		try {
			const response = await recoverUserInfo.forgotPasswordRecoverUserInfo({
				dtNascimento: state.birthday,
				id:
					state.id === '3'
						? state.userCode.toLowerCase()
						: formatMasks('clear', state.userCode),
				tipoId: state.id,
				phone: state.phone,
			});
			console.log(response);
			setToken({
				...token,
				cdPessoa: response.cdPessoa,
			});
			navigate('/forgot-password-token');
		} catch (error) {
			console.log(error.message);
			alert(error.message);
		}
	};

	useEffect(() => {
		if (state.userCode.search('@') > 0) {
			setState({...state, userCode: state.userCode, id: '3'});
		} else if (isCPF(formatMasks('clear', state.userCode))) {
			setMax(12);
			setState({...state, userCode: formatMasks('cpf', state.userCode), id: '1'});
		} else {
			setMax(18);
			setState({...state, userCode: formatMasks('carteirinha', state.userCode), id: '2'});
		}
	}, [state.userCode]);

	function checkDate() {
		setState({
			...state,
			birthdayInvalid: !checkMasks('date', state.birthday) && state.birthday !== '',
			birthdayInvalidMsg: !state.birthdayInvalid ? 'Data inválida!' : '',
		});
	}

	function checkPhone() {
		setState({
			...state,
			phoneInvalid: !checkMasks('phone', state.phone) && state.phone !== '',
			phoneInvalidMsg: !state.phoneInvalid ? 'Número inválido!' : '',
		});
	}

	return (
		<S.Container>
			<S.Section>
				<HeaderLogo />
				<Title />
				<S.ContainerForm onSubmit={handleSubmit}>
					<TextField
						label="Dados do seu plano Hapvida:"
						required
						placeholder="Use o CPF, e-mail ou número da carteirinha"
						value={state.userCode}
						maxLength={max}
						onChange={event => setState({...state, userCode: event.target.value})}
					/>
					<TextField
						label="Data de nascimento:"
						required
						placeholder="00/00/0000"
						value={state.birthday}
						onChange={event =>
							setState({
								...state,
								birthday: formatMasks('date', event.target.value),
								birthdayInvalid: false,
								birthdayInvalidMsg: '',
							})
						}
						isInvalid={state.birthdayInvalid}
						invalidMessage={state.birthdayInvalidMsg}
						onBlur={checkDate}
					/>
					<TextField
						label="Número de celular:"
						required
						placeholder="(00) 00000 - 0000"
						value={state.phone}
						onChange={event =>
							setState({
								...state,
								phone: formatMasks('phone', event.target.value),
								phoneInvalid: false,
								phoneInvalidMsg: '',
							})
						}
						isInvalid={state.phoneInvalid}
						invalidMessage={state.phoneInvalidMsg}
						onBlur={checkPhone}
					/>
					<Button
						type="submit"
						style={{marginTop: '1.25rem', justifySelf: 'end'}}
						rightIcon={<MdArrowForward />}>
						{translations['pt-br'].confirmDataPage.continueButton}
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
