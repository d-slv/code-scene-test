/* eslint-disable no-alert */
import React, {Suspense, useEffect, useState} from 'react';
import {useRecoilState, useRecoilValue, useResetRecoilState} from 'recoil';
import {useNavigate} from 'react-router-dom';
import amplitude from 'amplitude-js';
import TagManager from 'react-gtm-module';
import 'moment/locale/pt-br';
import {GrCircleAlert} from 'react-icons/gr';
import {MdOutlineMessage} from 'react-icons/md';

import {
	PatchMedicalConfirm,
	PatchOdontoConfirm,
	GetObligationPdf,
	PostOperationalCostPassword,
	PostFiveStars,
	GetFiveStars,
	PatchExamsConfirm,
	GetMedicalCard,
	GetFiveStarsModel,
} from 'domain/usecases';
import {checkMasks, ChatRooms} from 'presentation/utils';
import {Modal} from 'presentation/components/modal';
import {operationalCostStates} from 'presentation/pages/states/atoms';
import {translations} from 'presentation/translations';
import {Button} from 'presentation/components/button/button';
import {SadFaceIcon} from 'presentation/components/icons';
import {makeGetChatRoom} from 'main/factories/usecases';
import {Slider} from 'presentation/components/slider';
import {FiveStar} from 'presentation/components/five-star/five-star';
import {MedicalCardModal} from 'presentation/components/medical-card/medical-card-modal';
import {PerksClubIcon} from 'presentation/components/icons/perks-club-icon';
import {getPerksClubLink} from 'presentation/utils/getPerksClubLink';
import {Loading} from 'presentation/components/loading';
import {appointmentDetailsState} from 'presentation/pages/my-appointments-flow/atoms';
import {examDetailsState} from 'presentation/pages/my-exams-flow/atoms';
import {AppointmentsList} from './components/AppointmentsList';
import {ObligationsList} from './components/ObligationsList';
import {
	CardService,
	ClipboardPulse,
	ContainerCardsService,
	ContentContainer,
	HeaderContainer,
	InputCode,
	Link,
	MedicalCard,
	ModalContainer,
	ModalContainerOperacionalPass,
	ModalContent,
	ModalContentOperacionalPass,
	ModalHeaderPendency,
	ModalOperationalContent,
	ModalOperationalHeader,
	ExternalLinkCardService,
	Section,
	SectionCombiner,
	SectionTitle,
	Stethoscope,
	Teleconsultation,
	TitleHeader,
	Tooth,
} from './styles';
import {FiveStarsList} from './components/FiveStarsList';
import {EmergencyLink} from './components/EmergencyLink';
import {accountDataState} from '../atoms';

const localTranslations = translations['pt-br'].homePage;

type Props = {
	medicalRebookConfirm: PatchMedicalConfirm;
	odontoRebookConfirm: PatchOdontoConfirm;
	examRebookConfirm: PatchExamsConfirm;
	obligationPdf: GetObligationPdf;
	operationalCostPassword: PostOperationalCostPassword;
	answers: PostFiveStars;
	questions: GetFiveStars;
	medicalCard: GetMedicalCard;
};

export const HomePage: React.FC<Props> = ({
	questions,
	answers,
	medicalRebookConfirm,
	odontoRebookConfirm,
	examRebookConfirm,
	obligationPdf,
	operationalCostPassword,
	medicalCard,
}) => {
	const [isMedicalCardModalOpen, setIsMedicalCardModalOpen] = useState(false);
	const [isOperationalModalOpen, setIsOperationalModalOpen] = useState(false);
	const [passOperationalModalOpen, setPassOperationalModalOpen] = useState(false);
	const [isPendencyOpenModal, setIsPendencyOpenModal] = useState(false);
	const [isOpenFiveStars, setIsOpenFiveStars] = useState(false);
	const [hideCard, setHideCard] = useState(false);

	const [questionsResult, setQuestionsResult] = useState<GetFiveStarsModel>();

	const [urlToNavigate, setUrlToNavigate] = useState('');
	const [opCostStates, setOpCostStates] = useRecoilState(operationalCostStates);
	const {sidebar, beneficiary} = useRecoilValue(accountDataState);
	const navigate = useNavigate();
	const resetAppointmentStorage = useResetRecoilState(appointmentDetailsState);
	const resetExamStorage = useResetRecoilState(examDetailsState);

	// | custo operacional |
	function verifyPassOperational() {
		operationalCostPassword
			.post({
				cdEmpresa: sidebar.ctOperacional?.cdEmpresa,
				nuSenha: opCostStates.userCode,
			})
			.then(() => {
				alert('custo operacional');
				navigate(urlToNavigate);
				setPassOperationalModalOpen(false);
				setOpCostStates({...opCostStates, userCode: ''});
			})
			.catch(() => {
				alert('custo operacional');
				setOpCostStates({
					userCode: opCostStates.userCode,
					isInvalid: true,
					invalidMsg: 'Senha incorreta ou inválida',
				});
			});
	}

	function checkCode() {
		if (opCostStates.userCode !== '') {
			const ck = !checkMasks('opCode', opCostStates.userCode);
			setOpCostStates({
				...opCostStates,
				isInvalid: ck,
				invalidMsg: ck ? 'Senha incorreta ou inválida' : '',
			});
		}
	}

	function verifyToOpen(logEvent: string, link: string) {
		const tagManagerArgs = {
			gtmId: 'GTM-KQKN552',
			events: {
				sendUserInfo: `${logEvent}`,
			},
		};

		TagManager.initialize(tagManagerArgs);
		amplitude.getInstance().logEvent(logEvent);
		if (sidebar.flUsuarioInadimplente) {
			setIsPendencyOpenModal(true);
			return;
		}
		if (sidebar.ctOperacional && !sidebar.ctOperacional?.ativo) {
			setIsOperationalModalOpen(true);
			return;
		}
		if (sidebar.ctOperacional && sidebar.ctOperacional?.exigeSenha) {
			setPassOperationalModalOpen(true);
			setUrlToNavigate(link);
			return;
		}
		navigate(link);
	}

	function callChat(value) {
		makeGetChatRoom()
			.get({roomType: value, nmUsuario: beneficiary.nmUsuarioC})
			.then(response => window.open(response.url));
	}

	useEffect(() => {
		document.title = localTranslations.titleHomePage;

		questions.get().then(response => {
			setQuestionsResult(response);
		});
		resetAppointmentStorage();
		resetExamStorage();
	}, []);

	return (
		<Suspense fallback={<Loading variant="logo" customMsg="Carregando..." />}>
			<HeaderContainer>
				<TitleHeader>
					<b>{beneficiary.nmUsuarioC.split(' ')[0]}</b>, {localTranslations.whatWantToDo}
				</TitleHeader>
				<ContainerCardsService>
					{!sidebar.flPlanoSomenteHospitalar && (
						<Slider step={140} useArrows={false} spaceBetween={30}>
							<CardService
								backgroundColor="primary"
								color="white"
								onClick={() => setIsMedicalCardModalOpen(true)}>
								<MedicalCard />
								{localTranslations.medicalCard}
							</CardService>

							{beneficiary.tipoPlanoC !== 'ODONTO' && <EmergencyLink />}

							{beneficiary.tipoPlanoC !== 'ODONTO' && (
								<CardService
									onClick={() =>
										verifyToOpen(
											'Marcar Teleconsulta',
											'/minhas-consultas/marcar-teleconsulta',
										)
									}>
									<Teleconsultation />
									{localTranslations.scheduleTeleconsult}
								</CardService>
							)}

							{beneficiary.tipoPlanoC !== 'ODONTO' && (
								<CardService
									onClick={() =>
										verifyToOpen(
											'Marcar Consulta',
											'/minhas-consultas/marcar-consulta',
										)
									}>
									<Stethoscope />
									{localTranslations.scheduleConsult}
								</CardService>
							)}

							{beneficiary.tipoPlanoC !== 'SAUDE' && (
								<CardService
									onClick={() =>
										verifyToOpen(
											'Marcar Dentista',
											'/minhas-consultas/marcar-dentista',
										)
									}>
									<Tooth />
									{localTranslations.scheduleDentist}
								</CardService>
							)}

							{beneficiary.tipoPlanoC !== 'ODONTO' && (
								<CardService
									onClick={() =>
										verifyToOpen('Marcar Exame', '/meus-exames/marcar-exame')
									}>
									<ClipboardPulse />
									{localTranslations.scheduleExam}
								</CardService>
							)}
							<ExternalLinkCardService
								href={getPerksClubLink({
									nm_usuario: beneficiary.nmUsuarioC,
									nu_cpf: beneficiary.nuCpfC,
								})}
								target="_blank">
								<PerksClubIcon />
								{localTranslations.perksClub}
							</ExternalLinkCardService>
						</Slider>
					)}
				</ContainerCardsService>
			</HeaderContainer>

			<ContentContainer>
				<Section>
					<SectionTitle>{localTranslations.lastAppointments}</SectionTitle>
					<AppointmentsList
						medicalRebookConfirm={medicalRebookConfirm}
						odontoRebookConfirm={odontoRebookConfirm}
						examRebookConfirm={examRebookConfirm}
					/>
				</Section>
				<SectionCombiner>
					<Section>
						<SectionTitle>{localTranslations.financialTitle}</SectionTitle>
						<ObligationsList obligationPdf={obligationPdf} />
					</Section>

					<Section>
						<SectionTitle>{localTranslations.ratingTitle}</SectionTitle>
						<FiveStarsList
							questionsResult={questionsResult}
							hideCard={hideCard}
							setIsOpenFiveStars={setIsOpenFiveStars}
						/>
					</Section>
				</SectionCombiner>
			</ContentContainer>

			<FiveStar
				answers={answers}
				setHideCard={setHideCard}
				showModal={isOpenFiveStars}
				setShowModal={setIsOpenFiveStars}
				questions={questionsResult?.items}
			/>

			<Modal
				title="Senha para agendamento de consulta"
				isOpen={passOperationalModalOpen}
				onClose={() => {
					setPassOperationalModalOpen(false);
					setOpCostStates({...opCostStates, userCode: ''});
				}}>
				<ModalContainerOperacionalPass>
					<ModalContentOperacionalPass>
						{`${sidebar.ctOperacional?.mensagem}`}
					</ModalContentOperacionalPass>
					<InputCode
						required
						value={opCostStates.userCode}
						onChange={event =>
							setOpCostStates({
								...opCostStates,
								invalidMsg: '',
								isInvalid: false,
								userCode: event.target.value,
							})
						}
						maxLength={6}
						onBlur={checkCode}
						borderRadius={'nano'}
						centralizedMessage={true}
						onMouseLeave={() => {
							checkCode();
						}}
						isInvalid={opCostStates.isInvalid}
						invalidMessage={opCostStates.invalidMsg}
					/>
					<Button fontSize={'xxs'} onClick={verifyPassOperational}>
						Validar senha
					</Button>
					<Link href="#" onClick={() => callChat(ChatRooms.beta)}>
						Não tenho senha
					</Link>
				</ModalContainerOperacionalPass>
			</Modal>

			<Modal
				style={{width: '30%'}}
				isOpen={isOperationalModalOpen}
				onClose={() => setIsOperationalModalOpen(false)}>
				<ModalContainer>
					<ModalOperationalHeader>
						<GrCircleAlert />
					</ModalOperationalHeader>

					<ModalOperationalContent>
						{`${sidebar.ctOperacional?.mensagem}`}
					</ModalOperationalContent>

					<Button
						fontSize={'xxs'}
						onClick={() => callChat(ChatRooms.beta)}
						leftIcon={<MdOutlineMessage />}>
						Conversar com atendente
					</Button>
				</ModalContainer>
			</Modal>

			<Modal
				style={{width: '35%'}}
				isOpen={isPendencyOpenModal}
				onClose={() => setIsPendencyOpenModal(false)}
				title="Marcação indisponível">
				<ModalContainer>
					<ModalHeaderPendency>
						<SadFaceIcon />
					</ModalHeaderPendency>
					<ModalContent>
						Identificamos uma pendência no seu contrato, que está impedindo a marcação.
						Orientamos que entre em contato com{' '}
						{sidebar.flAdministradora === true
							? 'a administradora do seu plano'
							: 'o RH da sua empresa'}{' '}
						ou com a equipe de atendimento.
					</ModalContent>
					<Button
						fontSize={'xxs'}
						onClick={() => callChat(ChatRooms.beta)}
						rightIcon={<MdOutlineMessage />}>
						Conversar com atendente
					</Button>
				</ModalContainer>
			</Modal>

			{isMedicalCardModalOpen && (
				<MedicalCardModal
					medicalCard={medicalCard}
					closeCallback={() => setIsMedicalCardModalOpen(false)}
				/>
			)}
		</Suspense>
	);
};
