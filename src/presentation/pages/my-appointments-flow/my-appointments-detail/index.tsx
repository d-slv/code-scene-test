import React, {useEffect, useRef, useState} from 'react';
import moment from 'moment';
import {useNavigate} from 'react-router-dom';
import {useRecoilState, useRecoilValue, useResetRecoilState, useSetRecoilState} from 'recoil';

import {
	healthMarkdownStates,
	odontoMarkdownStates,
	choosedPlanStates,
	telehealthMarkdownStates,
} from 'presentation/pages/states/atoms';
import {Modal} from 'presentation/components/modal';
import {translations} from 'presentation/translations';
import {formatText} from 'presentation/utils';
import {Button} from 'presentation/components/button/button';
import {MdDownload, MdOutlineArrowBack} from 'react-icons/md';
import {printAppointment} from 'presentation/utils/utilFunctions';
import {FailureToLoadModal} from 'presentation/components/failure-to-load';
import {ButtonEventProps} from 'presentation/components/add-to-calendar-button';
import {PostOdontoCancel, PostMedicalCancel} from 'domain/usecases';
import AddToCalendarButton from 'presentation/components/add-to-calendar-button/add-to-calendar-button';
import {Ticket} from 'presentation/components/ticket';
import {ConsultationTypeEnum} from 'presentation/constants/bookingTypesEnum';
import {Loading} from 'presentation/components/loading';
import theme from 'presentation/styles/theme.styles';
import {accountDataState, refresherIdState} from 'presentation/pages/entry-flow/atoms';
import {formatAddress} from 'presentation/components/ticket/ticket-utils';
import {
	BoldText,
	CalendarIcon,
	CardModalCancel,
	CardModalCancelBody,
	CircleHeaderIcon,
	ContainerModalCanceled,
	ContentHeaderAppointments,
	ContentModalContainer,
	Divider,
	Exam,
	HeaderButton,
	HeaderCardAppointments,
	HeaderContainer,
	Health,
	RightContent,
	StyledText,
	Teleconsultation,
	TextCanceled,
	TextProtocol,
	Title,
	Tooth,
	UtilButtons,
} from './styles';
import {appointmentDetailsState} from '../atoms';

const localTranslations = translations['pt-br'].bookingFlow;

type Props = {
	cancelAppointmentOdonto: PostOdontoCancel;
	cancelAppointmentMedical: PostMedicalCancel;
};

export const MyAppointmentsDetail: React.FC<Props> = ({
	cancelAppointmentOdonto,
	cancelAppointmentMedical,
}: Props) => {
	const printRef = useRef();
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false);
	const [showError, setShowError] = useState(false);
	const selectedContract = useRecoilValue(choosedPlanStates);
	const [canceledProtocol, setCanceledProtocol] = useState('');
	const [cancelConfirmModal, setCancelConfirmModal] = useState(false);
	const [query, setQuery] = useState({matches: window.matchMedia('(min-width: 820px)').matches});
	const [healthMarkdown, setHealthMarkdown] = useRecoilState(healthMarkdownStates);
	const [odontoMarkdown, setOdontoMarkdwon] = useRecoilState(odontoMarkdownStates);
	const [isModalCancelConsultationOpen, setIsModalCancelConsultationOpen] = useState(false);
	const [telehealthMarkdown, setTelehealthMarkdown] = useRecoilState(telehealthMarkdownStates);

	const appointmentDetail = useRecoilValue(appointmentDetailsState);
	const resetAppointment = useResetRecoilState(appointmentDetailsState);
	const {beneficiary} = useRecoilValue(accountDataState);
	const setRefresherId = useSetRecoilState(refresherIdState);

	function handleRefresher() {
		setRefresherId(val => val + 1);
	}

	const cancelOdontoAppointment = async (code: string): Promise<void> => {
		try {
			const response = await cancelAppointmentOdonto.post({
				nuConsulta: code,
				cdPontoEntrada: '1',
			});
			setCanceledProtocol(response.protocolo);
			setCancelConfirmModal(true);
			handleRefresher();
		} catch (error) {
			setIsLoading(false);
		} finally {
			setIsLoading(false);
		}
	};

	const cancelHealthAppointment = async (code: string): Promise<void> => {
		try {
			const response = await cancelAppointmentMedical.post({
				number: code,
			});
			setCanceledProtocol(response.detail.content.protocol);
			setCancelConfirmModal(true);
			handleRefresher();
		} catch (error) {
			setShowError(true);
		} finally {
			setIsLoading(false);
		}
	};

	const cancelAppointments = (typeCancel: string) => {
		if (typeCancel === ConsultationTypeEnum.ODONTO) {
			return (
				cancelOdontoAppointment(appointmentDetail.nuConsulta),
				setIsModalCancelConsultationOpen(false)
			);
		}

		return (
			cancelHealthAppointment(appointmentDetail.nuConsulta),
			setIsModalCancelConsultationOpen(false)
		);
	};

	const dateAppointment = moment(appointmentDetail.dtConsulta, 'D/M/YYYY HH:mm').format(
		'YYYY/MM/DD HH:mm',
	);

	const appointmentEvent: ButtonEventProps = {
		title: `Consulta em Hapvida para ${formatText(appointmentDetail.dsEspecialidade)}`,
		startDate: new Date(dateAppointment),
		durationInMinutes: 15,
		description: `${formatText(appointmentDetail.nmPrestadorJuridico)} - ${formatText(
			appointmentDetail.nmPrestadorFisico,
		)}\n\nNo dia da consulta, apresente um documento com foto ao chegar no local de atendimento!`,
		address: `${appointmentDetail.tipoLogradouro} ${formatText(
			appointmentDetail.logradouro,
		)}, ${appointmentDetail.numero} - ${formatText(appointmentDetail.bairro)}, ${formatText(
			appointmentDetail.nmCidade,
		)} - ${appointmentDetail.cdUf}`,
	};

	const reschedule = (type: string) => {
		if (type === ConsultationTypeEnum.TELECONSULTATION) {
			navigate('/minhas-consultas/remarcar-teleconsulta');
			setTelehealthMarkdown({
				...telehealthMarkdown,
				nuConsulta: appointmentDetail.nuConsulta,
				cdEspecialidade: appointmentDetail.cdEspecialidade,
				cdUsuario: selectedContract.cdUsuarioC,
				nmEspecialidadeAux: appointmentDetail.dsEspecialidade,
				nmUsuarioAux: beneficiary.nmUsuarioC,
			});
		} else if (type === ConsultationTypeEnum.ODONTO) {
			navigate('/minhas-consultas/remarcar-dentista');
			setOdontoMarkdwon({
				...odontoMarkdown,
				cdUfAux: appointmentDetail.cdUf,
				nmCidadeAux: appointmentDetail.nmCidade,
				nuConsulta: appointmentDetail.nuConsulta,
				cdEspecialidade: appointmentDetail.cdEspecialidade,
				cdUsuario: selectedContract.cdUsuarioC,
				nmEspecialidadeAux: appointmentDetail.dsEspecialidade,
				nmUsuarioAux: beneficiary.nmUsuarioC,
			});
		} else {
			navigate('/minhas-consultas/remarcar-consulta');
			setHealthMarkdown({
				...healthMarkdown,
				cdUfAux: appointmentDetail.cdUf,
				nmCidadeAux: appointmentDetail.nmCidade,
				nuConsulta: appointmentDetail.nuConsulta,
				cdEspecialidade: appointmentDetail.cdEspecialidade,
				cdUsuario: selectedContract.cdUsuarioC,
				nmEspecialidadeAux: appointmentDetail.dsEspecialidade,
				nmUsuarioAux: beneficiary.nmUsuarioC,
			});
		}
	};

	const titleOptions = (): string => {
		switch (appointmentDetail.tipoConsulta) {
			case ConsultationTypeEnum.TELECONSULTATION:
				return localTranslations.scheduledTelemedicineTitle;
			case ConsultationTypeEnum.ODONTO:
				return localTranslations.scheduledOdontoTitle;
			default:
				return localTranslations.scheduledHealthTitle;
		}
	};

	useEffect(() => {
		const handler = e => setQuery({matches: e.matches});
		window.matchMedia('(min-width: 820px)').addEventListener('change', handler);
	}, []);

	return (
		<div style={{position: 'relative'}}>
			{isLoading ? (
				<Loading />
			) : (
				<>
					<HeaderContainer>
						<Title>Detalhes da consulta</Title>

						<RightContent>
							<HeaderButton
								onClick={() => {
									navigate('/minhas-consultas');
									resetAppointment();
								}}
								variant="outlined"
								leftIcon={<MdOutlineArrowBack />}>
								{query.matches
									? `${translations['pt-br'].appointmentsFlow.returnDetailAppointments}`
									: `${translations['pt-br'].appointmentsFlow.returnDetailButton}`}
							</HeaderButton>
							<HeaderButton
								variant="outlined"
								onClick={() => reschedule(appointmentDetail.tipoConsulta)}>
								{query.matches
									? `${translations['pt-br'].appointmentsFlow.rescheduleDetailAppointments}`
									: `${translations['pt-br'].appointmentsFlow.rescheduleDetailButton}`}
							</HeaderButton>
						</RightContent>
					</HeaderContainer>
					<div ref={printRef}>
						<Ticket
							ticketTitle={titleOptions()}
							appointmentDate={appointmentDetail.dtConsulta}
							nmPrestadorJuridico={appointmentDetail.nmPrestadorJuridico}
							nmPrestadorFisico={appointmentDetail.nmPrestadorFisico}
							nuProtocolo={appointmentDetail.nuProtocolo}
							nuTelefones={
								Array.isArray(appointmentDetail.nuTelefone)
									? appointmentDetail.nuTelefone
									: [appointmentDetail.nuTelefone]
							}
							dsEspecialidade={appointmentDetail.dsEspecialidade}
							tipoConsulta={appointmentDetail.tipoConsulta}
							separatedAddress={{
								type: appointmentDetail.tipoLogradouro,
								address: appointmentDetail.logradouro,
								number: appointmentDetail.numero,
								district: appointmentDetail.bairro,
								city: appointmentDetail.nmCidade,
								state: appointmentDetail.cdUf,
								complement: appointmentDetail.complemento,
								reference: appointmentDetail.pontoReferencia,
							}}
						/>
					</div>
					<UtilButtons>
						<Button
							color="danger"
							spacingInsetY={'xs'}
							spacingInsetX={'sm'}
							onClick={() => setIsModalCancelConsultationOpen(true)}>
							{localTranslations.buttonCancelAppointmentHealth}
						</Button>
						<Button
							spacingInsetX={'sm'}
							onClick={() => {
								printAppointment(printRef);
							}}
							color="SecondaryBlue.500"
							leftIcon={<MdDownload />}>
							{localTranslations.buttonDownloadVoucher}
						</Button>
						<AddToCalendarButton detail={true} calendarEvent={appointmentEvent} />
					</UtilButtons>

					<Modal
						leftTitle
						variant="other"
						isOpen={isModalCancelConsultationOpen}
						title={
							appointmentDetail.tipoConsulta !== ConsultationTypeEnum.EXAM
								? 'Cancelar Consulta'
								: 'Cancelar Exame'
						}
						onClose={() => {
							setIsModalCancelConsultationOpen(!isModalCancelConsultationOpen);
						}}>
						<ContentModalContainer>
							<StyledText>
								<BoldText>
									{translations['pt-br'].myAppointmentsCard.warningTitle}
								</BoldText>
								{''}
								{translations['pt-br'].myAppointmentsCard.warningText}
							</StyledText>
							<StyledText>
								{appointmentDetail.tipoConsulta !== ConsultationTypeEnum.EXAM
									? translations['pt-br'].myAppointmentsCard.warningQuestion
									: translations['pt-br'].myAppointmentsCard.warningQuestionExam}
							</StyledText>
							<CardModalCancel>
								<HeaderCardAppointments
									variantCard={
										appointmentDetail.tipoConsulta !== ConsultationTypeEnum.EXAM
									}>
									<ContentHeaderAppointments>
										{appointmentDetail.tipoConsulta !==
										ConsultationTypeEnum.EXAM ? (
											<StyledText color={theme.colors.white}>
												{formatText(appointmentDetail.dsEspecialidade)}
											</StyledText>
										) : (
											<StyledText color={theme.colors.white}>
												{appointmentDetail.dsEspecialidade}
											</StyledText>
										)}

										<StyledText
											weight={700}
											size={1.25}
											color={theme.colors.white}>
											{dateAppointment}
										</StyledText>
									</ContentHeaderAppointments>
									<CircleHeaderIcon>
										{appointmentDetail.tipoConsulta ===
											ConsultationTypeEnum.HEALTH && <Health />}
										{appointmentDetail.tipoConsulta ===
											ConsultationTypeEnum.ODONTO && <Tooth />}
										{appointmentDetail.tipoConsulta ===
											ConsultationTypeEnum.TELECONSULTATION && (
											<Teleconsultation />
										)}
										{appointmentDetail.tipoConsulta ===
											ConsultationTypeEnum.EXAM && <Exam />}
									</CircleHeaderIcon>
								</HeaderCardAppointments>
								<CardModalCancelBody>
									<StyledText>
										<BoldText>
											{
												translations['pt-br'].myAppointmentsCard
													.appointmentFor
											}
										</BoldText>{' '}
										{formatText(beneficiary.nmUsuarioC)}
									</StyledText>
									<StyledText>
										<BoldText>
											{
												translations['pt-br'].myAppointmentsCard[
													appointmentDetail.tipoConsulta ===
													ConsultationTypeEnum.ODONTO
														? 'appointmentDentist'
														: 'appointmentDoctor'
												]
											}
										</BoldText>{' '}
										{formatText(appointmentDetail.nmPrestadorFisico)}
									</StyledText>
									<Divider />
									<StyledText>
										<BoldText>
											{formatText(appointmentDetail.nmPrestadorJuridico)}
										</BoldText>
									</StyledText>
									{appointmentDetail.tipoConsulta !==
										ConsultationTypeEnum.TELECONSULTATION && (
										<StyledText size={0.875} color={theme.colors['gray.5']}>
											{formatAddress({
												type: appointmentDetail.tipoLogradouro,
												address: appointmentDetail.logradouro,
												number: appointmentDetail.numero,
												district: appointmentDetail.bairro,
												complement: appointmentDetail.complemento,
												city: appointmentDetail.nmCidade,
												state: appointmentDetail.cdUf,
												reference: appointmentDetail.pontoReferencia,
											})}
										</StyledText>
									)}
								</CardModalCancelBody>
							</CardModalCancel>
							<Button
								fullWidth
								variant="contained"
								color="primary"
								onClick={() => cancelAppointments(appointmentDetail.tipoConsulta)}>
								{translations['pt-br'].myAppointmentsCard.cancelConfirmButton}
							</Button>
						</ContentModalContainer>
					</Modal>

					<Modal
						variant={'guide'}
						isOpen={cancelConfirmModal}
						title={'Consulta Cancelada'}
						onClose={() => {
							setCancelConfirmModal(!cancelConfirmModal);
						}}>
						<ContainerModalCanceled>
							<CalendarIcon />
							<TextCanceled>
								{translations['pt-br'].appointmentsFlow.modalCanceledText}
							</TextCanceled>
							<TextProtocol>
								{translations['pt-br'].appointmentsFlow.modalCanceledProtocol}
								{''}
								{canceledProtocol}
							</TextProtocol>
							<Button
								onClick={() => {
									setCancelConfirmModal(false);
									navigate('/minhas-consultas');
									resetAppointment();
								}}>
								<b>{translations['pt-br'].appointmentsFlow.modalCanceledButton}</b>
							</Button>
						</ContainerModalCanceled>
					</Modal>

					<FailureToLoadModal isModalOpen={showError} setIsModalOpen={setShowError} />
				</>
			)}
		</div>
	);
};
