import React, {Suspense, useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';

import {PostExamsCancel, PatchExamsConfirm, ExamBooked} from 'domain/usecases';
import {Modal} from 'presentation/components/modal';
import {useRecoilState, useRecoilValue, useResetRecoilState, useSetRecoilState} from 'recoil';
import {translations} from 'presentation/translations';
import {Button} from 'presentation/components/button/button';
import {FailureToLoadModal} from 'presentation/components/failure-to-load';
import {Loading} from 'presentation/components/loading';
import {
	CalendarIcon,
	ContainerModal,
	HeaderContainer,
	RightContent,
	TextCanceled,
	TextProtocol,
	Title,
} from './styles';
import {ExamsList} from './components/ExamsList';
import {accountDataState, refresherIdState} from '../entry-flow/atoms';
import {examDetailsState} from './atoms';
import {examBookingState, selectedExamState} from '../booking-flow/exam-booking/atoms';
import {selectedUfState, selectedCityState} from '../booking-flow/atoms';

type Props = {
	cancelAppointmentExam: PostExamsCancel;
	confirmAppointmentExams: PatchExamsConfirm;
};

export const MyExams: React.FC<Props> = ({cancelAppointmentExam, confirmAppointmentExams}) => {
	const navigate = useNavigate();
	const [showError, setShowError] = useState(false);
	const [canceledProtocol, setCanceledProtocol] = useState('');
	const [cancelConfirmModal, setCancelConfirmModal] = useState(false);

	const [examBooking, setExamBooking] = useRecoilState(examBookingState);
	const [selectedExam, setSelectedExam] = useRecoilState(selectedExamState);

	const {beneficiary} = useRecoilValue(accountDataState);

	const setExamDetails = useSetRecoilState(examDetailsState);
	const setRefresherId = useSetRecoilState(refresherIdState);
	const setSelectedUf = useSetRecoilState(selectedUfState('exam'));
	const setSelectedCity = useSetRecoilState(selectedCityState('exam'));

	const resetExamsDetails = useResetRecoilState(examDetailsState);
	const resetExamBookingDetails = useResetRecoilState(examBookingState);

	function handleRefresher() {
		setRefresherId(val => val + 1);
	}

	function handleGoToDetails(details: ExamBooked) {
		setExamDetails(details);
		navigate('/meus-exames/detalhes-do-exame');
	}

	async function handleCancelExam(examCode: string) {
		try {
			const response = await cancelAppointmentExam.post({
				nuExame: examCode,
				cdPontoEntrada: examBooking.cdPontoEntrada,
			});
			setCanceledProtocol(response.nuProtocolo);
			setCancelConfirmModal(true);
			handleRefresher();
		} catch (error) {
			setShowError(true);
		}
	}

	async function handleConfirmExams(examCode: string) {
		try {
			await confirmAppointmentExams.patch({
				nuExame: examCode,
				flConfirmado: 'S',
				cdPontoEntrada: examBooking.cdPontoEntrada,
			});
			handleRefresher();
		} catch {
			setShowError(true);
		}
	}

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
		document.title = translations['pt-br'].appointmentsFlow.myExamsTitle;

		resetExamsDetails();
		resetExamBookingDetails();
	}, []);

	return (
		<>
			<HeaderContainer>
				<Title>{translations['pt-br'].appointmentsFlow.myExamsTitle}</Title>
				<RightContent>
					<Button
						variant="outlined"
						spacingInsetX="sm"
						spacingInsetY="nano"
						onClick={() => navigate('/meus-exames/marcar-exame')}>
						{translations['pt-br'].appointmentsFlow.newAppointmentExam}
					</Button>
				</RightContent>
			</HeaderContainer>

			<Suspense fallback={<Loading customMsg="Carregando..." />}>
				<ExamsList
					handleGoToDetails={handleGoToDetails}
					handleReschedule={handleRescheduleExam}
					handleCancelExam={handleCancelExam}
					handleConfirmExam={handleConfirmExams}
				/>
			</Suspense>

			<Modal
				isOpen={cancelConfirmModal}
				title={'Consulta Cancelada'}
				onClose={() => {
					setCancelConfirmModal(!cancelConfirmModal);
				}}>
				<ContainerModal>
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
						}}>
						{translations['pt-br'].appointmentsFlow.modalCanceledButton}
					</Button>
				</ContainerModal>
			</Modal>

			<FailureToLoadModal isModalOpen={showError} setIsModalOpen={setShowError} />
		</>
	);
};
