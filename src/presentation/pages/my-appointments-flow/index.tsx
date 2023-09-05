import React, {Suspense, useEffect, useState} from 'react';
import {
	PostOdontoCancel,
	PatchOdontoConfirm,
	PostMedicalCancel,
	PatchMedicalConfirm,
	AgendamentoConsulta,
} from 'domain/usecases';
import {useNavigate} from 'react-router-dom';
import {Modal} from 'presentation/components/modal';
import {useRecoilState, useRecoilValue, useSetRecoilState} from 'recoil';
import {translations} from 'presentation/translations';
import {Button} from 'presentation/components/button/button';
import {FailureToLoadModal} from 'presentation/components/failure-to-load';
import {SelectDropdownSpecialties} from 'presentation/components/select-specialties/select-field-specialties';
import {ConsultationTypeEnum} from 'presentation/constants/bookingTypesEnum';
import {Loading} from 'presentation/components/loading';
import {
	healthMarkdownStates,
	odontoMarkdownStates,
	telehealthMarkdownStates,
} from '../states/atoms';
import {AppointmentsList, Options} from './components/AppointmentsList';
import {
	CalendarIcon,
	ContainerModal,
	HeaderContainer,
	RightContent,
	TextCanceled,
	TextProtocol,
	Title,
} from './styles';
import {appointmentDetailsState} from './atoms';
import {accountDataState, refresherIdState} from '../entry-flow/atoms';

type Props = {
	cancelAppointmentOdonto: PostOdontoCancel;
	cancelAppointmentMedical: PostMedicalCancel;
	confirmAppointmentOdonto: PatchOdontoConfirm;
	confirmAppointmentMedical: PatchMedicalConfirm;
};

export const MyAppointments: React.FC<Props> = ({
	cancelAppointmentOdonto,
	cancelAppointmentMedical,
	confirmAppointmentOdonto,
	confirmAppointmentMedical,
}: Props) => {
	const navigate = useNavigate();
	const [showError, setShowError] = useState(false);
	const [canceledProtocol, setCanceledProtocol] = useState('');
	const [selectedOption, setSelectedOption] = useState<Options>('Todos');
	const [cancelConfirmModal, setCancelConfirmModal] = useState(false);
	const [healthMarkdown, setHealthMarkdown] = useRecoilState(healthMarkdownStates);
	const [odontoMarkdown, setOdontoMarkdown] = useRecoilState(odontoMarkdownStates);
	const [telehealthMarkdown, setTelehealthMarkdown] = useRecoilState(telehealthMarkdownStates);
	const {beneficiary} = useRecoilValue(accountDataState);
	const setAppointmentDetails = useSetRecoilState(appointmentDetailsState);
	const setRefresherId = useSetRecoilState(refresherIdState);

	function handleRefresher() {
		setRefresherId(val => val + 1);
	}

	function handleGoToDetails(details: AgendamentoConsulta) {
		setAppointmentDetails(details);
		navigate('/minhas-consultas/detalhes-da-consulta');
	}

	async function cancelOdontoAppointment(code: string): Promise<void> {
		try {
			const response = await cancelAppointmentOdonto.post({
				nuConsulta: code,
				cdPontoEntrada: '1',
			});
			setCanceledProtocol(response.protocolo);
			setCancelConfirmModal(true);
			handleRefresher();
		} catch (error) {
			setShowError(true);
		}
	}

	async function cancelHealthAppointment(code: string): Promise<void> {
		try {
			const response = await cancelAppointmentMedical.post({
				number: code,
			});
			setCanceledProtocol(response.detail.content.protocol);
			setCancelConfirmModal(true);
			handleRefresher();
		} catch (error) {
			setShowError(true);
		}
	}

	async function confirmPresenceOdonto(code: string) {
		try {
			await confirmAppointmentOdonto.patch({
				nuConsulta: code,
				flagConfirmado: 's',
			});
			handleRefresher();
		} catch (error) {
			setShowError(true);
		}
	}

	async function confirmPresenceHealth(code: string) {
		try {
			await confirmAppointmentMedical.patch({
				number: code,
				confirmationFlag: 'S',
			});
			handleRefresher();
		} catch (error) {
			setShowError(true);
		}
	}

	function validateConfirm(code: string, type: string) {
		if (type !== ConsultationTypeEnum.ODONTO) {
			confirmPresenceHealth(code);
		} else {
			confirmPresenceOdonto(code);
		}
	}

	function confirmAppointment(obj: AgendamentoConsulta) {
		validateConfirm(String(obj.nuConsulta), obj.tipoConsulta);
	}

	function reschedule(type: string, data: AgendamentoConsulta) {
		if (type === ConsultationTypeEnum.TELECONSULTATION) {
			navigate('/minhas-consultas/remarcar-teleconsulta');
			setTelehealthMarkdown({
				...telehealthMarkdown,
				nuConsulta: data.nuConsulta,
				cdEspecialidade: data.cdEspecialidade,
				nmEspecialidadeAux: data.dsEspecialidade,
				nmUsuarioAux: beneficiary.nmUsuarioC,
			});
		} else if (ConsultationTypeEnum.ODONTO) {
			navigate('/minhas-consultas/remarcar-dentista');
			setOdontoMarkdown({
				...odontoMarkdown,
				cdUfAux: data.cdUf,
				nmCidadeAux: data.nmCidade,
				nuConsulta: data.nuConsulta,
				cdEspecialidade: data.cdEspecialidade,
				nmEspecialidadeAux: data.dsEspecialidade,
				nmUsuarioAux: beneficiary.nmUsuarioC,
			});
		} else {
			navigate('/minhas-consultas/remarcar-consulta');
			setHealthMarkdown({
				...healthMarkdown,
				cdUfAux: data.cdUf,
				nmCidadeAux: data.nmCidade,
				nuConsulta: data.nuConsulta,
				cdEspecialidade: data.cdEspecialidade,
				nmEspecialidadeAux: data.dsEspecialidade,
				nmUsuarioAux: beneficiary.nmUsuarioC,
			});
		}
	}

	useEffect(() => {
		document.title = translations['pt-br'].appointmentsFlow.myAppointmentsTitle;
	}, []);

	return (
		<>
			<HeaderContainer>
				<Title>{translations['pt-br'].appointmentsFlow.myAppointmentsTitle}</Title>
				<RightContent>
					<SelectDropdownSpecialties
						selectedOption={selectedOption}
						setSelectedOption={setSelectedOption}
					/>
				</RightContent>
			</HeaderContainer>

			<Suspense fallback={<Loading customMsg="Carregando..." />}>
				<AppointmentsList
					selectedOption={selectedOption}
					handleGoToDetails={handleGoToDetails}
					handleReschedule={reschedule}
					handleConfirmAppointment={confirmAppointment}
					cancelOdontoAppointment={cancelOdontoAppointment}
					cancelHealthAppointment={cancelHealthAppointment}
				/>
			</Suspense>

			<Modal
				variant={'guide'}
				style={{maxWidth: '350px'}}
				isOpen={cancelConfirmModal}
				title={'Consulta Cancelada'}
				onClose={() => {
					setCancelConfirmModal(!cancelConfirmModal);
				}}>
				<ContainerModal>
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
						}}>
						{translations['pt-br'].appointmentsFlow.modalCanceledButton}
					</Button>
				</ContainerModal>
			</Modal>

			<FailureToLoadModal isModalOpen={showError} setIsModalOpen={setShowError} />
		</>
	);
};
