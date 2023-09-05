import amplitude from 'amplitude-js';
import {PostOdontoBookingConfirm, PostOdontoRebook} from 'domain/usecases';
import {FailureToLoadModal} from 'presentation/components/failure-to-load';
import {Loading} from 'presentation/components/loading';
import {
	markdownOdontoStates,
	odontoBookingStates,
	scheduledOdontoStates,
} from 'presentation/pages/states/atoms';
import {translations} from 'presentation/translations';
import {formatText} from 'presentation/utils';
import React, {useEffect, useState} from 'react';
import TagManager from 'react-gtm-module';
import {MdCheckCircle} from 'react-icons/md';
import {useNavigate} from 'react-router-dom';
import {useRecoilState} from 'recoil';
import * as S from './styles';

interface Step6Props {
	onBackClick: () => void;
	reschedule: PostOdontoRebook;
	schedule: PostOdontoBookingConfirm;
}

export const Step6: React.FC<Step6Props> = ({schedule, reschedule, onBackClick}) => {
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false);
	const [showError, setShowError] = useState(false);
	const [odontoBooking, setOdontoBooking] = useRecoilState(odontoBookingStates);
	const [stateScheduled, setStateScheduled] = useRecoilState(scheduledOdontoStates);
	const [replaceScheduled, setReplaceScheduled] = useRecoilState(markdownOdontoStates);

	useEffect(() => {
		document.title = translations['pt-br'].bookingFlow.titleStepConclude;
	}, []);

	const confirmOdontoAppointment = async (): Promise<void> => {
		setIsLoading(true);
		try {
			const confirmResult = await schedule.post({
				dtConsulta: odontoBooking.dtConsulta,
				cdPontoEntrada: odontoBooking.cdPontoEntrada,
				horarioConsulta: odontoBooking.horarioConsulta,
				cdEspecialidade: odontoBooking.cdEspecialidade,
				cdPrestadorFisico: odontoBooking.cdPrestadorFisico,
				cdPrestadorJuridico: odontoBooking.cdPrestadorJuridico,
				cdSubEspecialidade: odontoBooking.cdSubEspecialidadeAux,
			});
			setStateScheduled({...stateScheduled, data: confirmResult});
			navigate('/minhas-consultas/marcar-dentista/confirmacao');
			const tagManagerArgs = {
				gtmId: 'GTM-KQKN552',
				events: {
					sendUserInfo: 'Marcou odonto',
				},
			};
			TagManager.initialize(tagManagerArgs);
			amplitude.getInstance().logEvent('Marcou odonto');
		} catch (error) {
			setShowError(true);
			setIsLoading(false);
		}
	};

	const replaceOdontoAppointment = async (): Promise<void> => {
		try {
			setIsLoading(true);
			const confirmResult = await reschedule.post({
				dtConsulta: odontoBooking.dtConsulta,
				nuConsulta: odontoBooking.nuConsulta,
				cdPontoEntrada: odontoBooking.cdPontoEntrada,
				horarioConsulta: odontoBooking.horarioConsulta,
				cdEspecialidade: odontoBooking.cdEspecialidade,
				cdPrestadorFisico: odontoBooking.cdPrestadorFisico,
				cdPrestadorJuridico: odontoBooking.cdPrestadorJuridico,
				cdSubEspecialidade: odontoBooking.cdSubEspecialidadeAux,
			});
			setReplaceScheduled({...replaceScheduled, data: confirmResult});
			navigate('/minhas-consultas/marcar-dentista/confirmacao');
			const tagManagerArgs = {
				gtmId: 'GTM-KQKN552',
				events: {
					sendUserInfo: 'Remarcou odonto',
				},
			};

			TagManager.initialize(tagManagerArgs);
			amplitude.getInstance().logEvent('Remarcou odonto');
			setIsLoading(false);
		} catch {
			setShowError(true);
			setIsLoading(false);
		}
	};

	const checkScheduleType = () => {
		if (odontoBooking.flReagendamento === false) {
			confirmOdontoAppointment();
		} else {
			replaceOdontoAppointment();
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
							<S.CardAbstractTitle>
								{`Consulta em: ${odontoBooking.nmEspecialidadeAux}`}
							</S.CardAbstractTitle>
							<S.CardSummaryDate>{`${odontoBooking.dtConsulta} às ${odontoBooking.horarioConsulta}`}</S.CardSummaryDate>
							<S.AppointmentInformation>
								<S.AbstractTitle>
									{translations['pt-br'].bookingFlow.beneficiary}
								</S.AbstractTitle>
								<S.SummaryContent>
									{formatText(odontoBooking.nmUsuarioAux)}
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
									{formatText(odontoBooking.nmPrestadorJuridicoAux)}
								</S.SummaryContent>
							</S.AppointmentInformation>
							<S.AppointmentInformation>
								<S.AbstractTitle>
									{translations['pt-br'].bookingFlow.dentist}
								</S.AbstractTitle>
								<S.SummaryContent>
									{formatText(odontoBooking.nmPrestadorFisicoAux)}
								</S.SummaryContent>
								<S.SpecialtySummary>
									{translations['pt-br'].bookingFlow.specialistDentist}{' '}
									{odontoBooking.nmEspecialidadeAux}
								</S.SpecialtySummary>
							</S.AppointmentInformation>
						</S.ResumeContent>
					</S.QuerySummaryCard>

					<S.FooterCardButtons>
						<S.ButtonScheduleOdonto
							onClick={() => {
								onBackClick();
								setOdontoBooking({
									...odontoBooking,
									horarioConsulta: '',
								});
							}}
							fontSize={'xxs'}
							variant="outlined">
							{translations['pt-br'].bookingFlow.buttonChangeHour}
						</S.ButtonScheduleOdonto>
						<S.ButtonScheduleOdonto
							onClick={() => checkScheduleType()}
							leftIcon={<MdCheckCircle />}
							color="primary"
							fontSize={'xxs'}
							variant="contained">
							{translations['pt-br'].bookingFlow.buttonSchedule}
						</S.ButtonScheduleOdonto>
					</S.FooterCardButtons>

					<FailureToLoadModal isModalOpen={showError} setIsModalOpen={setShowError} />
				</>
			)}
		</>
	);
};
