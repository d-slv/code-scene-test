import React, {useEffect, useState} from 'react';
import amplitude from 'amplitude-js';
import {useRecoilState} from 'recoil';
import {
	telehealthBookingStates,
	scheduledTelehealthStates,
	markdownTelehealthStates,
} from 'presentation/pages/states/atoms';
import TagManager from 'react-gtm-module';
import {useNavigate} from 'react-router-dom';
import {MdCheckCircle} from 'react-icons/md';
import {formatText} from 'presentation/utils';
import {translations} from 'presentation/translations';
import {FailureToLoadModal} from 'presentation/components/failure-to-load';
import {PostMedicalBookingConfirm, PostMedicalRebook} from 'domain/usecases';
import {Loading} from 'presentation/components/loading';
import * as S from './styles';

interface Step5Props {
	onBackClick: () => void;
	reschedule: PostMedicalRebook;
	booking: PostMedicalBookingConfirm;
}

export const Step5: React.FC<Step5Props> = ({booking, reschedule, onBackClick}) => {
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false);
	const [showError, setShowError] = useState(false);
	const [stateScheduled, setStateScheduled] = useRecoilState(scheduledTelehealthStates);
	const [telehealthBooking, setTelehealthBooking] = useRecoilState(telehealthBookingStates);
	const [replaceTelehealth, setReplaceTelehealth] = useRecoilState(markdownTelehealthStates);

	useEffect(() => {
		document.title = translations['pt-br'].bookingFlow.titleStepConclude;
	}, []);

	const confirmHealthAppointment = async (): Promise<void> => {
		setIsLoading(true);
		try {
			const confirmResult = await booking.post({
				cdEspecialidade: telehealthBooking.cdEspecialidade,
				cdPrestadorJuridico: telehealthBooking.cdPrestadorJuridico,
				cdPrestadorFisico: telehealthBooking.cdPrestadorFisico,
				dtAgendamento: telehealthBooking.dtConsulta,
				horarioAgendamento: telehealthBooking.horarioConsulta,
				nuCelular: telehealthBooking.nuTelefone,
			});
			setStateScheduled({...stateScheduled, data: confirmResult});
			navigate('/minhas-consultas/marcar-teleconsulta/confirmacao');
			const tagManagerArgs = {
				gtmId: 'GTM-KQKN552',
				events: {
					sendUserInfo: 'Marcou teleconsulta',
				},
			};
			TagManager.initialize(tagManagerArgs);
			amplitude.getInstance().logEvent('Marcou teleconsulta');
			setIsLoading(false);
		} catch {
			setShowError(true);
			setIsLoading(false);
		}
	};

	const replaceHealthAppointment = async (): Promise<void> => {
		setIsLoading(true);
		try {
			const confirmResult = await reschedule.post({
				nuConsulta: telehealthBooking.nuConsulta,
				dtAgendamento: telehealthBooking.dtConsulta,
				cdEspecialidade: telehealthBooking.cdEspecialidade,
				horarioAgendamento: telehealthBooking.horarioConsulta,
				cdPrestadorFisico: telehealthBooking.cdPrestadorFisico,
				cdPrestadorJuridico: telehealthBooking.cdPrestadorJuridico,
			});
			setReplaceTelehealth({...replaceTelehealth, data: confirmResult});
			navigate('/minhas-consultas/marcar-teleconsulta/confirmacao');
			const tagManagerArgs = {
				gtmId: 'GTM-KQKN552',
				events: {
					sendUserInfo: 'Remarcou teleconsulta',
				},
			};
			TagManager.initialize(tagManagerArgs);
			amplitude.getInstance().logEvent('Remarcou teleconsulta');
			setIsLoading(false);
		} catch {
			setShowError(true);
			setIsLoading(false);
		}
	};

	const checkScheduleType = () => {
		if (telehealthBooking.flReagendamento === false) {
			confirmHealthAppointment();
		} else {
			replaceHealthAppointment();
		}
	};
	return (
		<>
			{isLoading ? (
				<Loading style={{minHeight: 300}} />
			) : (
				<>
					<S.QuerySummaryCard topAccentcolor={'primary'} variant={'top-accent'}>
						<S.ResumeContent>
							<S.CardAbstractTitle>{`Consulta em ${telehealthBooking.nmEspecialidadeAux}`}</S.CardAbstractTitle>
							<S.CardSummaryDate>{`${telehealthBooking.dtConsulta} às ${telehealthBooking.horarioConsulta}`}</S.CardSummaryDate>
							<S.AppointmentInformation>
								<S.AbstractTitle>
									{translations['pt-br'].bookingFlow.beneficiary}
								</S.AbstractTitle>
								<S.SummaryContent>
									{formatText(telehealthBooking.nmUsuarioAux)}
								</S.SummaryContent>
							</S.AppointmentInformation>
						</S.ResumeContent>
						<S.VerticalLine />
						<S.ResumeContent>
							<S.AppointmentInformation>
								<S.AbstractTitle>
									{translations['pt-br'].bookingFlow.place}
								</S.AbstractTitle>
								<S.SummaryContent>
									{formatText(telehealthBooking.nmPrestadorJuridicoAux)}
								</S.SummaryContent>
							</S.AppointmentInformation>
							<S.AppointmentInformation>
								<S.AbstractTitle>
									{translations['pt-br'].bookingFlow.doctor}
								</S.AbstractTitle>
								<S.SummaryContent>
									{formatText(telehealthBooking.nmPrestadorFisicoAux)}
								</S.SummaryContent>
							</S.AppointmentInformation>
						</S.ResumeContent>
					</S.QuerySummaryCard>

					<S.FooterCardButtons>
						<S.ButtonScheduleHealth
							onClick={() => {
								onBackClick();
								setTelehealthBooking({
									...telehealthBooking,
									horarioConsulta: '',
								});
							}}
							fontSize={'xxs'}
							variant="outlined">
							{translations['pt-br'].bookingFlow.buttonChangeHour}
						</S.ButtonScheduleHealth>
						<S.ButtonScheduleHealth
							leftIcon={<MdCheckCircle />}
							color="primary"
							fontSize={'xxs'}
							variant="contained"
							onClick={() => checkScheduleType()}>
							{translations['pt-br'].bookingFlow.buttonSchedule}
						</S.ButtonScheduleHealth>
					</S.FooterCardButtons>

					<FailureToLoadModal isModalOpen={showError} setIsModalOpen={setShowError} />
				</>
			)}
		</>
	);
};
