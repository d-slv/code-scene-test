import React, {useEffect, useState} from 'react';
import amplitude from 'amplitude-js';
import {useRecoilState} from 'recoil';
import {
	healthBookingStates,
	markdownHealthStates,
	scheduledHealthStates,
} from 'presentation/pages/states/atoms';
import TagManager from 'react-gtm-module';
import {useNavigate} from 'react-router-dom';
import {MdCheckCircle} from 'react-icons/md';
import {formatText} from 'presentation/utils';
import {translations} from 'presentation/translations';
import {FailureToLoadModal} from 'presentation/components/failure-to-load';
import {PostMedicalCreateAppointment, PutMedicalRescheduleAppointment} from 'domain/usecases';
import {Loading} from 'presentation/components/loading';
import * as S from './styles';

interface Step7Props {
	onBackClick: () => void;
	reschedule: PutMedicalRescheduleAppointment;
	booking: PostMedicalCreateAppointment;
}

export const Step7: React.FC<Step7Props> = ({booking, onBackClick, reschedule}) => {
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false);
	const [showError, setShowError] = useState(false);
	const [healthBooking, setHealthBooking] = useRecoilState(healthBookingStates);
	const [replaceHealth, setReplaceHealth] = useRecoilState(markdownHealthStates);
	const [stateScheduled, setStateScheduled] = useRecoilState(scheduledHealthStates);

	useEffect(() => {
		document.title = translations['pt-br'].bookingFlow.titleStepConclude;
	}, []);

	// TODO alinhar com o Fabrício quais parametros podem ser mockados
	const confirmHealthAppointment = async (): Promise<void> => {
		setIsLoading(true);
		try {
			const confirmResult =
				healthBooking.cdSubEspecialidadeAux === '0'
					? await booking.post({
							number: '0',
							date: `${healthBooking.dtConsulta} ${healthBooking.horarioConsulta}`,
							providerCode: healthBooking.cdPrestadorFisico,
							clinicCode: healthBooking.cdPrestadorJuridico,
							specialtyCode: healthBooking.cdEspecialidade,
					  })
					: await booking.post({
							number: '0',
							date: `${healthBooking.dtConsulta} ${healthBooking.horarioConsulta}`,
							providerCode: healthBooking.cdPrestadorFisico,
							clinicCode: healthBooking.cdPrestadorJuridico,
							specialtyCode: healthBooking.cdEspecialidade,
							subSpecialtyCode: healthBooking.cdSubEspecialidadeAux,
					  });

			setStateScheduled({...stateScheduled, data: confirmResult});
			setIsLoading(false);
			navigate('/minhas-consultas/marcar-consulta/confirmacao');

			const tagManagerArgs = {
				gtmId: 'GTM-KQKN552',
				events: {
					sendUserInfo: 'Marcou Saúde',
				},
			};

			TagManager.initialize(tagManagerArgs);
			amplitude.getInstance().logEvent('Marcou Saúde');
		} catch {
			setShowError(true);
			setIsLoading(false);
		}
	};
	// TODO alinhar com o Fabrício quais parametros podem ser mockados
	// TODO não passa o horário?
	const replaceHealthAppointment = async (): Promise<void> => {
		setIsLoading(true);
		try {
			const confirmResult =
				healthBooking.cdSubEspecialidadeAux === '0'
					? await reschedule.put({
							number: healthBooking.nuConsulta,
							date: `${healthBooking.dtConsulta} ${healthBooking.horarioConsulta}`,
							providerCode: healthBooking.cdPrestadorFisico,
							clinicCode: healthBooking.cdPrestadorJuridico,
							specialtyCode: healthBooking.cdEspecialidade,
					  })
					: await reschedule.put({
							number: healthBooking.nuConsulta,
							date: `${healthBooking.dtConsulta} ${healthBooking.horarioConsulta}`,
							providerCode: healthBooking.cdPrestadorFisico,
							clinicCode: healthBooking.cdPrestadorJuridico,
							specialtyCode: healthBooking.cdEspecialidade,
							subSpecialtyCode: healthBooking.cdSubEspecialidadeAux,
					  });

			setReplaceHealth({...replaceHealth, data: confirmResult});
			navigate('/minhas-consultas/marcar-consulta/confirmacao');
			const tagManagerArgs = {
				gtmId: 'GTM-KQKN552',
				events: {
					sendUserInfo: 'Remarcou saude',
				},
			};

			TagManager.initialize(tagManagerArgs);
			amplitude.getInstance().logEvent('Remarcou saude');
			setIsLoading(false);
		} catch {
			setShowError(true);
			setIsLoading(false);
		}
	};

	const checkScheduleType = () => {
		if (healthBooking.flReagendamento === false) {
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
							<S.CardAbstractTitle>{`Consulta em ${healthBooking.nmEspecialidadeAux}`}</S.CardAbstractTitle>
							<S.CardSummaryDate>{`${healthBooking.dtConsulta} às ${healthBooking.horarioConsulta}`}</S.CardSummaryDate>
							<S.AppointmentInformation>
								<S.AbstractTitle>
									{translations['pt-br'].bookingFlow.beneficiary}
								</S.AbstractTitle>
								<S.SummaryContent>
									{formatText(healthBooking.nmUsuarioAux)}
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
									{formatText(healthBooking.nmPrestadorJuridicoAux)}
								</S.SummaryContent>
							</S.AppointmentInformation>
							<S.AppointmentInformation>
								<S.AbstractTitle>
									{translations['pt-br'].bookingFlow.doctor}
								</S.AbstractTitle>
								<S.SummaryContent>
									{formatText(healthBooking.nmPrestadorFisicoAux)}
								</S.SummaryContent>
								<S.SpecialtySummary>
									{translations['pt-br'].bookingFlow.specialistDoctor}{' '}
									{healthBooking.nmEspecialidadeAux}
								</S.SpecialtySummary>
							</S.AppointmentInformation>
						</S.ResumeContent>
					</S.QuerySummaryCard>

					<S.FooterCardButtons>
						<S.ButtonScheduleHealth
							fontSize={'xxs'}
							variant="outlined"
							onClick={() => {
								onBackClick();
								setHealthBooking({
									...healthBooking,
									horarioConsulta: '',
								});
							}}>
							{translations['pt-br'].bookingFlow.buttonChangeHour}
						</S.ButtonScheduleHealth>
						<S.ButtonScheduleHealth
							color="primary"
							fontSize={'xxs'}
							variant="contained"
							leftIcon={<MdCheckCircle />}
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
