import React, {useEffect, useRef, useState} from 'react';
import moment from 'moment';
import {useNavigate} from 'react-router-dom';
import {useRecoilState, useRecoilValue, useResetRecoilState, useSetRecoilState} from 'recoil';
import {MdDownload, MdOutlineArrowBack} from 'react-icons/md';

import {formatText} from 'presentation/utils';
import {ExamBooked, PostExamsCancel} from 'domain/usecases';
import {Modal} from 'presentation/components/modal';
import {translations} from 'presentation/translations';
import {Button} from 'presentation/components/button/button';
import {printAppointment} from 'presentation/utils/utilFunctions';
import {FailureToLoadModal} from 'presentation/components/failure-to-load';
import {ButtonEventProps} from 'presentation/components/add-to-calendar-button';
import AddToCalendarButton from 'presentation/components/add-to-calendar-button/add-to-calendar-button';
import {Ticket} from 'presentation/components/ticket';
import theme from 'presentation/styles/theme.styles';
import {ConsultationTypeEnum} from 'presentation/constants/bookingTypesEnum';
import {accountDataState, refresherIdState} from 'presentation/pages/entry-flow/atoms';
import {
	examBookingState,
	selectedExamState,
} from 'presentation/pages/booking-flow/exam-booking/atoms';
import {selectedCityState, selectedUfState} from 'presentation/pages/booking-flow/atoms';
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
	RightContent,
	StyledText,
	TextCanceled,
	TextProtocol,
	Title,
	UtilButtons,
} from './styles';
import {examDetailsState, prepareExamState} from '../atoms';

type Props = {
	cancelAppointmentExam: PostExamsCancel;
};

export const MyExamsDetail: React.FC<Props> = ({cancelAppointmentExam}) => {
	const printRef = useRef();
	const navigate = useNavigate();

	const [showError, setShowError] = useState(false);
	const [canceledProtocol, setCanceledProtocol] = useState('');
	const [cancelConfirmModal, setCancelConfirmModal] = useState(false);
	const [query, setQuery] = useState({matches: window.matchMedia('(min-width: 820px)').matches});
	const [isModalCancelConsultationOpen, setIsModalCancelConsultationOpen] = useState(false);

	const [examBooking, setExamBooking] = useRecoilState(examBookingState);
	const [selectedExam, setSelectedExam] = useRecoilState(selectedExamState);

	const examDetail = useRecoilValue(examDetailsState);
	const examPreparation = useRecoilValue(prepareExamState(examDetail.cdTipoExame));
	const {beneficiary} = useRecoilValue(accountDataState);

	const setRefresherId = useSetRecoilState(refresherIdState);
	const setSelectedUf = useSetRecoilState(selectedUfState('exam'));
	const setSelectedCity = useSetRecoilState(selectedCityState('exam'));

	const resetExam = useResetRecoilState(examDetailsState);

	function handleRefresher() {
		setRefresherId(val => val + 1);
	}

	async function handleCancelExam(code: string): Promise<void> {
		try {
			const response = await cancelAppointmentExam.post({
				nuExame: code,
				cdPontoEntrada: examBooking.cdPontoEntrada,
			});
			setIsModalCancelConsultationOpen(false);
			setCancelConfirmModal(true);
			setCanceledProtocol(response.nuProtocolo);
			handleRefresher();
		} catch (error) {
			setShowError(true);
			setIsModalCancelConsultationOpen(false);
		}
	}

	const dateAppointment = moment(examDetail.dtExameMarcado, 'D/M/YYYY HH:mm').format(
		'YYYY/MM/DD HH:mm',
	);

	const formattedAppointmentDate = moment(examDetail.dtExameMarcado, 'D/M/YYYY HH:mm').format(
		'DD/MM/YY [às] HH:mm',
	);

	const appointmentEvent: ButtonEventProps = {
		title: `Exame em Hapvida para ${formatText(examDetail.nmTipoExame)}`,
		startDate: new Date(dateAppointment),
		durationInMinutes: 15,
		description: `${formatText(examDetail.nmPrestadorJuridico)} - ${formatText(
			examDetail.nmPrestadorFisico,
		)}\n\nNo dia do exame, apresente um documento com foto ao chegar no local de atendimento!`,
		address: examDetail.dsEnderecoPrestadorJuridico,
	};

	function handleRescheduleExam(data: ExamBooked) {
		const splitText = data.dsEnderecoPrestadorJuridico.slice(
			data.dsEnderecoPrestadorJuridico.lastIndexOf(' ') + 1,
		);
		setSelectedUf(splitText.split('/')[1]);
		setSelectedCity(splitText.split('/')[0]);
		setSelectedExam({...selectedExam, cdTipoExame: data.cdTipoExame});

		setExamBooking({
			...examBooking,
			nuExame: data.nuExame,
			cdUf: splitText.split('/')[1],
			nmCidade: splitText.split('/')[0],
			nmUsuario: beneficiary.nmUsuarioC,
			sexo: beneficiary.flSexoUsuario,
			nuIdade: beneficiary.idadeC,
			cdTipoExame: Number(data.cdTipoExame),
			dsTipoExame: data.nmTipoExame,
			flReagendamento: true,
		});
		navigate('/meus-exames/remarcar-exame');
	}

	useEffect(() => {
		const handler = e => setQuery({matches: e.matches});
		window.matchMedia('(min-width: 820px)').addEventListener('change', handler);
	}, []);

	return (
		<>
			<HeaderContainer>
				<Title>{translations['pt-br'].appointmentsFlow.myExamsDetailsTitle}</Title>

				<RightContent>
					<HeaderButton
						onClick={() => {
							navigate('/meus-exames');
							resetExam();
						}}
						variant="outlined"
						leftIcon={<MdOutlineArrowBack />}>
						{query.matches
							? `${translations['pt-br'].appointmentsFlow.returnDetailExam}`
							: `${translations['pt-br'].appointmentsFlow.returnDetailButton}`}
					</HeaderButton>
					<HeaderButton
						variant="outlined"
						onClick={() => handleRescheduleExam(examDetail)}>
						{query.matches
							? `${translations['pt-br'].appointmentsFlow.rescheduleDetailExam}`
							: `${translations['pt-br'].appointmentsFlow.rescheduleDetailButton}`}
					</HeaderButton>
				</RightContent>
			</HeaderContainer>

			<div ref={printRef}>
				<Ticket
					ticketTitle={translations['pt-br'].bookingFlow.titleScheduledExam}
					appointmentDate={formattedAppointmentDate}
					nmPrestadorJuridico={examDetail.nmPrestadorJuridico}
					nmPrestadorFisico={examDetail.nmPrestadorFisico}
					nuProtocolo={examDetail.nuProtocolo}
					completeAddress={examDetail.dsEnderecoPrestadorJuridico}
					dsDescricao={examPreparation.dsDescricao}
					nmTipoExame={examDetail.nmTipoExame}
				/>
			</div>

			<UtilButtons>
				<Button
					color="danger"
					spacingInsetY={'xs'}
					spacingInsetX={'sm'}
					onClick={() => setIsModalCancelConsultationOpen(true)}>
					{translations['pt-br'].bookingFlow.buttonCancelAppointmentExam}
				</Button>
				<Button
					spacingInsetY={'xs'}
					spacingInsetX={'sm'}
					color="SecondaryBlue.500"
					onClick={() => {
						printAppointment(printRef);
					}}
					leftIcon={<MdDownload />}>
					{translations['pt-br'].bookingFlow.buttonDownloadVoucher}
				</Button>
				<AddToCalendarButton detail={true} calendarEvent={appointmentEvent} />
			</UtilButtons>

			<Modal
				leftTitle
				variant="other"
				isOpen={isModalCancelConsultationOpen}
				title="Cancelar Exame"
				onClose={() => {
					setIsModalCancelConsultationOpen(!isModalCancelConsultationOpen);
				}}>
				<ContentModalContainer>
					<StyledText>
						<BoldText>{translations['pt-br'].myAppointmentsCard.warningTitle}</BoldText>
						{''}
						{translations['pt-br'].myAppointmentsCard.warningText}
					</StyledText>
					<StyledText>
						{translations['pt-br'].myAppointmentsCard.warningQuestionExam}
					</StyledText>

					<CardModalCancel>
						<HeaderCardAppointments
							variantCard={examDetail.tipoConsulta !== ConsultationTypeEnum.EXAM}>
							<ContentHeaderAppointments>
								<StyledText color={theme.colors.white}>
									{formatText(examDetail.nmTipoExame)}
								</StyledText>
								<StyledText weight={700} size={1.25} color={theme.colors.white}>
									{dateAppointment}
								</StyledText>
							</ContentHeaderAppointments>
							<CircleHeaderIcon>
								<Exam />
							</CircleHeaderIcon>
						</HeaderCardAppointments>
						<CardModalCancelBody>
							<StyledText>
								<BoldText>
									{translations['pt-br'].myAppointmentsCard.appointmentFor}
								</BoldText>{' '}
								{formatText(beneficiary.nmUsuarioC)}
							</StyledText>
							<StyledText>
								<BoldText>
									{translations['pt-br'].myAppointmentsCard.appointmentDoctor}
								</BoldText>{' '}
								{formatText(examDetail.nmPrestadorFisico)}
							</StyledText>
							<Divider />
							<StyledText>
								<BoldText>{formatText(examDetail.nmPrestadorJuridico)}</BoldText>
							</StyledText>

							<StyledText size={0.875} color={theme.colors['gray.5']}>
								{formatText(examDetail.dsEnderecoPrestadorJuridico)}
							</StyledText>
						</CardModalCancelBody>
					</CardModalCancel>
					<Button
						fullWidth
						variant="contained"
						color="primary"
						onClick={() => handleCancelExam(String(examDetail.nuExame))}>
						{translations['pt-br'].myAppointmentsCard.cancelConfirmButton}
					</Button>
				</ContentModalContainer>
			</Modal>

			<Modal
				variant={'guide'}
				isOpen={cancelConfirmModal}
				title={'Exame Cancelado'}
				onClose={() => navigate('/meus-exames')}>
				<ContainerModalCanceled>
					<CalendarIcon />
					<TextCanceled>
						{translations['pt-br'].appointmentsFlow.modalCanceledTextExam}
					</TextCanceled>
					<TextProtocol>
						{translations['pt-br'].appointmentsFlow.modalCanceledProtocol}
						{''}
						{canceledProtocol}
					</TextProtocol>
					<Button
						onClick={() => {
							setCancelConfirmModal(false);
							navigate('/meus-exames');
						}}>
						<b>{translations['pt-br'].appointmentsFlow.modalCanceledButton}</b>
					</Button>
				</ContainerModalCanceled>
			</Modal>

			<FailureToLoadModal isModalOpen={showError} setIsModalOpen={setShowError} />
		</>
	);
};
