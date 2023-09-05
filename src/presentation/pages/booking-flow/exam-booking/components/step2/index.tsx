import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {useRecoilState, useRecoilValue, useResetRecoilState, useSetRecoilState} from 'recoil';

import {GetExamsAuthorizedPassword, GetExamsAuthorizedPrePassword} from 'domain/usecases';
import {Modal} from 'presentation/components/modal';
import {translations} from 'presentation/translations';
import {Button} from 'presentation/components/button/button';
import {SearchBar} from 'presentation/components/search-bar';
import {checkMasks, formatMasks, formatText} from 'presentation/utils';
import {RadioCheckButtonContainer} from 'presentation/components/radio-check-button';
import theme from 'presentation/styles/theme.styles';
import {selectedUfState, selectedCityState} from 'presentation/pages/booking-flow/atoms';
import {accountDataState} from 'presentation/pages/entry-flow/atoms';
import {CardEmpty} from 'presentation/components/card-empty/card-empty';
import {
	BoldText,
	CardWrapper,
	BodyCard,
	CardStepPageDescription,
	CardStepPageTitle,
	CircleHeaderIcon,
	ContainerButton,
	ContentModalContainer,
	Divider,
	Exam,
	FormModal,
	HeaderCard,
	HeaderContainer,
	InputCode,
	AuthorizationModalFooter,
	ModalText,
	PasswordHelpText,
	Scroll,
	SpecialtyLetters,
	StyledText,
	LastScheduledModalFooter,
	ButtonWrapper,
	HeaderWrapper,
	EmptyCardContainer,
} from './styles';
import {FooterNavigation} from '../FooterNavigation';
import {
	filteredExamTypesState,
	examsFilterLettersState,
	scheduledExamsHistoryState,
	examsFilterQueryState,
	selectedExamState,
	bookedExamState,
	examBookingState,
} from '../../atoms';
import {LoadingError} from '../LoadingError';

const localTranslations = translations['pt-br']['card-empty'];
interface Step2Props {
	onNextClick: () => void;
	onBackClick: () => void;
	authorizedPassword: GetExamsAuthorizedPassword;
	authorizedPrePassword: GetExamsAuthorizedPrePassword;
}

export const Step2: React.FC<Step2Props> = ({
	onNextClick,
	onBackClick,
	authorizedPassword,
	authorizedPrePassword,
}) => {
	const [count, setCount] = useState(0);
	const [examBooking, setExamBooking] = useRecoilState(examBookingState);
	const [isModalAuthorizationOpen, setIsModalAuthorizationOpen] = useState(false);
	const [isModalLastScheduledOpen, setIsModalLastScheduledOpen] = useState(false);

	const examTypes = useRecoilValue(filteredExamTypesState);
	const lettersFilterQuery = useRecoilValue(examsFilterLettersState);
	const scheduledExamsHistory = useRecoilValue(scheduledExamsHistoryState);

	const [query, setQuery] = useRecoilState(examsFilterQueryState);
	const [selectedExam, setSelectedExam] = useRecoilState(selectedExamState);
	const [bookedExam, setBookedExam] = useRecoilState(bookedExamState);

	const {beneficiary} = useRecoilValue(accountDataState);

	const setSelectedUf = useSetRecoilState(selectedUfState('exam'));
	const setSelectedCity = useSetRecoilState(selectedCityState('exam'));

	const resetSelectedExam = useResetRecoilState(selectedExamState);
	const resetQuery = useResetRecoilState(examsFilterQueryState);
	const resetBookedExam = useResetRecoilState(bookedExamState);

	const failToLoad = examTypes.length === 0 && query === '';

	const navigate = useNavigate();

	function handleCloseLastScheduledModal() {
		setIsModalLastScheduledOpen(false);
	}

	function handleBackClick() {
		onBackClick();
	}

	function handleNextClick() {
		if (selectedExam.flAutorizacao === true) {
			setIsModalAuthorizationOpen(true);
		} else {
			setExamBooking({
				...examBooking,
				cdTipoExame: Number(selectedExam.cdTipoExame),
				dsTipoExame: selectedExam.dsTipoExame,
				flAutorizacao: selectedExam.flAutorizacao,
				cdProcedimento: selectedExam.cdProcedimento,
				dtCarenciaExame: selectedExam.dtCarencia,
			});
			onNextClick();
		}
	}

	function checkCode() {
		if (examBooking.authCode !== '') {
			const ck = !checkMasks('examCode', examBooking.authCode);
			setExamBooking({
				...examBooking,
				authCodeInvalid: ck,
				authCodeStatus: ck ? 'Senha incorreta ou inválida' : '',
			});
		}
	}

	function handleRescheduleExam() {
		const splitText = bookedExam.dsEnderecoPrestadorJuridico.slice(
			bookedExam.dsEnderecoPrestadorJuridico.lastIndexOf(' ') + 1,
		);
		setSelectedUf(splitText.split('/')[1]);
		setSelectedCity(splitText.split('/')[0]);
		setSelectedExam({...selectedExam, cdTipoExame: bookedExam.cdTipoExame});

		setExamBooking({
			...examBooking,
			nuExame: bookedExam.nuExame,
			cdUf: splitText.split('/')[1],
			nmCidade: splitText.split('/')[0],
			nmUsuario: beneficiary.nmUsuarioC,
			sexo: beneficiary.flSexoUsuario,
			nuIdade: beneficiary.idadeC,
			cdTipoExame: Number(bookedExam.cdTipoExame),
			dsTipoExame: bookedExam.nmTipoExame,
			flReagendamento: true,
		});
		navigate('/meus-exames/remarcar-exame');
	}

	function verifyLastExamScheduled(value) {
		setSelectedExam(value);
		const alreadyBookedExam = scheduledExamsHistory.find(
			exam => exam.cdTipoExame === value.cdTipoExame,
		);
		if (alreadyBookedExam) {
			setBookedExam(alreadyBookedExam);
			setIsModalLastScheduledOpen(true);
		} else {
			setIsModalLastScheduledOpen(false);
		}
	}

	async function validateAuthorizedPassword() {
		try {
			const authorizedPasswordResult = await authorizedPassword.post({
				cdTipoExame: selectedExam.cdTipoExame,
				senhaAutorizada: examBooking.authCode,
			});
			setExamBooking({
				...examBooking,
				authCode: authorizedPasswordResult,
				authCodeInvalid: false,
				authCodeStatus: '',
			});
			onNextClick();
		} catch (error) {
			if (error.message.statusCode === 404) {
				setCount(value => value + 1);
				setExamBooking({
					...examBooking,
					authCode: '',
					authCodeInvalid: true,
					authCodeStatus: 'Senha incorreta ou inválida',
				});
			}
		}
	}

	async function validateAuthorizedPrePassword() {
		try {
			const authorizedPrePasswordResult = await authorizedPrePassword.post({
				cdTipoExame: selectedExam.cdTipoExame,
				preSenhaAutorizada: examBooking.authCode,
			});
			setExamBooking({...examBooking, authCode: authorizedPrePasswordResult});
			onNextClick();
		} catch (error) {
			if (error.message.statusCode === 404) {
				setCount(value => value + 1);
				validateAuthorizedPassword();
			}
		}
	}

	useEffect(() => {
		document.title = translations['pt-br'].bookingFlow.titleStepSpecialtyExam;
		resetSelectedExam();
		resetBookedExam();
		resetQuery();
	}, []);

	return (
		<>
			<HeaderContainer>
				<HeaderWrapper>
					<CardStepPageTitle>
						{translations['pt-br'].bookingFlow.specialtyStepTitleExam}
					</CardStepPageTitle>
					<CardStepPageDescription>
						{translations['pt-br'].bookingFlow.specialtyStepSubtitleExam}
					</CardStepPageDescription>
				</HeaderWrapper>
				{!failToLoad && <SearchBar onChange={value => setQuery(value)} />}
			</HeaderContainer>

			{failToLoad ? (
				<LoadingError />
			) : (
				<>
					<Scroll>
						{lettersFilterQuery.map(letter => (
							<SpecialtyLetters
								onClick={() => setQuery(letter)}
								isSelected={
									query.length === 1 &&
									letter.toLowerCase() === query.toLowerCase().charAt(0)
								}
								key={letter}>
								{letter.toUpperCase()}
							</SpecialtyLetters>
						))}
					</Scroll>
					{examTypes.length === 0 ? (
						<EmptyCardContainer>
							<CardEmpty title={localTranslations.title}>
								Não foram encontrados exames que contenha os caracteres digitados no
								campo de busca.
							</CardEmpty>
						</EmptyCardContainer>
					) : (
						<RadioCheckButtonContainer
							columns={2}
							onChange={value => verifyLastExamScheduled(value)}
							list={examTypes.map(exam => ({
								key: exam.dsTipoExame,
								value: exam,
							}))}
						/>
					)}

					<FooterNavigation
						disabled={!selectedExam.cdTipoExame}
						handleNextClick={handleNextClick}
						handleBackClick={handleBackClick}
					/>
				</>
			)}

			{isModalLastScheduledOpen && (
				<Modal
					titleStyle={{textAlign: 'center'}}
					customCloseBtnBgColor={theme.colors.primary}
					variant="other"
					isOpen={isModalLastScheduledOpen}
					title={translations['pt-br'].bookingFlow.modalTitleScheduledExam}
					onClose={handleCloseLastScheduledModal}>
					<ContentModalContainer>
						<CardWrapper>
							<HeaderCard>
								<BoldText size={1.25} color={theme.colors.white}>
									{bookedExam.dtExameMarcado}
								</BoldText>
								<CircleHeaderIcon>
									<Exam />
								</CircleHeaderIcon>
							</HeaderCard>
							<BodyCard>
								<BoldText size={1.25} color={theme.colors.primary}>
									{translations['pt-br'].myAppointmentsCard.appointmentFor}
								</BoldText>{' '}
								<StyledText size={1.25} color={theme.colors['gray.3']}>
									{formatText(examBooking.nmUsuario)}
								</StyledText>
								<Divider />
								<BoldText size={1.25} color={theme.colors.primary}>
									{translations['pt-br'].myAppointmentsCard.appointmentDoctor}
								</BoldText>{' '}
								<StyledText size={1.25} color={theme.colors['gray.3']}>
									{formatText(bookedExam.nmPrestadorFisico)}
								</StyledText>
								<Divider />
								<BoldText size={1.25} color={theme.colors.primary}>
									{selectedExam.dsTipoExame}
								</BoldText>
							</BodyCard>
						</CardWrapper>
						<LastScheduledModalFooter>
							<BoldText size={1.25}>Deseja continuar e substituir?</BoldText>
							<ButtonWrapper>
								<Button
									fullWidth
									variant="contained"
									color="primary"
									onClick={handleCloseLastScheduledModal}>
									{translations['pt-br'].bookingFlow.buttonReturn}
								</Button>
								<Button
									fullWidth
									variant="outlined"
									color="primary"
									onClick={handleRescheduleExam}>
									{translations['pt-br'].bookingFlow.buttonReplace}
								</Button>
							</ButtonWrapper>
						</LastScheduledModalFooter>
					</ContentModalContainer>
				</Modal>
			)}
			{isModalAuthorizationOpen && (
				<Modal
					isOpen={isModalAuthorizationOpen}
					variant={'guide'}
					title={'Esse exame precisa de autorização'}
					onClose={() => {
						setIsModalAuthorizationOpen(false);
						setExamBooking({...examBooking, authCode: ''});
					}}>
					<FormModal>
						<ModalText>
							{translations['pt-br'].bookingFlow.modalAuthText}{' '}
							<BoldText>{selectedExam.dsTipoExame}</BoldText>{' '}
							{translations['pt-br'].bookingFlow.modalAuthTextContinue}
						</ModalText>
						<InputCode
							required
							centralizedMessage={true}
							style={{width: '60%', marginLeft: 'auto', marginRight: 'auto'}}
							value={String(examBooking.authCode).toUpperCase()}
							onChange={e => {
								setExamBooking({
									...examBooking,
									authCodeInvalid: false,
									authCodeStatus: '',
									authCode: formatMasks('examCode', e.target.value),
								});
								setCount(0);
							}}
							maxLength={9}
							onBlur={checkCode}
							isInvalid={examBooking.authCodeInvalid}
							invalidMessage={examBooking.authCodeStatus}
						/>
						{count === 2 ? (
							<AuthorizationModalFooter>
								<ContainerButton>
									<Button color="danger">
										{translations['pt-br'].bookingFlow.modalAuthInvalidButton}
									</Button>
								</ContainerButton>
								<PasswordHelpText
									onClick={() => {
										window.open(
											'https://webhap.hapvida.com.br/pls/webhap/pk_saude.formulario?pds_app=pk_demanda_autorizacao.mobile&pfl_mobile=S&pfl_tipo=S&pfl_situacao=A&p_ambiente=S',
										);
									}}>
									{translations['pt-br'].bookingFlow.modalAuthTalkAttendant}
								</PasswordHelpText>
							</AuthorizationModalFooter>
						) : (
							<AuthorizationModalFooter>
								<ContainerButton>
									<Button
										type="submit"
										color="primary"
										disabled={examBooking.authCode.length < 9}
										onClick={validateAuthorizedPrePassword}>
										{translations['pt-br'].bookingFlow.modalAuthValidButton}
									</Button>
								</ContainerButton>
								<PasswordHelpText
									onClick={() => {
										window.open(
											'https://webhap.hapvida.com.br/pls/webhap/pk_saude.formulario?pds_app=pk_demanda_autorizacao.mobile&pfl_mobile=S&pfl_tipo=S&pfl_situacao=A&p_ambiente=S',
										);
									}}>
									{translations['pt-br'].bookingFlow.modalAuthTextHelper}
								</PasswordHelpText>
							</AuthorizationModalFooter>
						)}
					</FormModal>
				</Modal>
			)}
		</>
	);
};
