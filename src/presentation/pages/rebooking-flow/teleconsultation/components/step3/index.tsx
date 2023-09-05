import React, {useEffect, useState} from 'react';
import amplitude from 'amplitude-js';
import {useRecoilState} from 'recoil';
import TagManager from 'react-gtm-module';
import {useNavigate} from 'react-router-dom';
import {MdCheckCircle} from 'react-icons/md';
import {formatText} from 'presentation/utils';
import {PostMedicalRebook} from 'domain/usecases';
import {translations} from 'presentation/translations';
import {FailureToLoadModal} from 'presentation/components/failure-to-load';
import {telehealthMarkdownStates, markdownTelehealthStates} from 'presentation/pages/states/atoms';
import {Loading} from 'presentation/components/loading';
import * as S from './styles';

interface Step3Props {
	onBackClick: () => void;
	rebooking: PostMedicalRebook;
}

export const Step3: React.FC<Step3Props> = ({rebooking, onBackClick}) => {
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false);
	const [showError, setShowError] = useState(false);
	const [stateScheduled, setStateScheduled] = useRecoilState(markdownTelehealthStates);
	const [telehealthMarkdown, setTelehealthMarkdown] = useRecoilState(telehealthMarkdownStates);

	useEffect(() => {
		document.title = translations['pt-br'].bookingFlow.titleStepConcludeReschedule;
	}, []);

	const confirmHealthAppointment = async (): Promise<void> => {
		setIsLoading(true);
		try {
			const confirmResult = await rebooking.post({
				nuConsulta: telehealthMarkdown.nuConsulta,
				dtAgendamento: telehealthMarkdown.dtConsulta,
				cdEspecialidade: telehealthMarkdown.cdEspecialidade,
				horarioAgendamento: telehealthMarkdown.horarioConsulta,
				cdPrestadorFisico: telehealthMarkdown.cdPrestadorFisico,
				cdPrestadorJuridico: telehealthMarkdown.cdPrestadorJuridico,
			});
			setStateScheduled({...stateScheduled, data: confirmResult});
			const tagManagerArgs = {
				gtmId: 'GTM-KQKN552',
				events: {
					sendUserInfo: 'Remarcou teleconsulta',
				},
			};

			TagManager.initialize(tagManagerArgs);
			amplitude.getInstance().logEvent('Remarcou teleconsulta');
			setIsLoading(false);
			navigate('/minhas-consultas/remarcar-teleconsulta/confirmacao');
		} catch (error) {
			setShowError(true);
			setIsLoading(false);
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
							<S.CardAbstractTitle>{`Consulta em: ${telehealthMarkdown.nmEspecialidadeAux}`}</S.CardAbstractTitle>
							<S.CardSummaryDate>{`${telehealthMarkdown.dtConsulta} às ${telehealthMarkdown.horarioConsulta}`}</S.CardSummaryDate>
							<S.AppointmentInformation>
								<S.AbstractTitle>
									{translations['pt-br'].bookingFlow.beneficiary}
								</S.AbstractTitle>
								<S.SummaryContent>
									{formatText(telehealthMarkdown.nmUsuarioAux)}
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
									{formatText(telehealthMarkdown.nmPrestadorJuridicoAux)}
								</S.SummaryContent>
							</S.AppointmentInformation>
							<S.AppointmentInformation>
								<S.AbstractTitle>
									{translations['pt-br'].bookingFlow.doctor}
								</S.AbstractTitle>
								<S.SummaryContent>
									{formatText(telehealthMarkdown.nmPrestadorFisicoAux)}
								</S.SummaryContent>
							</S.AppointmentInformation>
						</S.ResumeContent>
					</S.QuerySummaryCard>

					<S.FooterCardButtons>
						<S.ButtonScheduleHealth
							fontSize={'xxs'}
							variant="outlined"
							onClick={() => {
								onBackClick();
								setTelehealthMarkdown({
									...telehealthMarkdown,
									horarioConsulta: '',
								});
							}}>
							{translations['pt-br'].bookingFlow.buttonChangeHour}
						</S.ButtonScheduleHealth>
						<S.ButtonScheduleHealth
							onClick={() => {
								const tagManagerArgs = {
									gtmId: 'GTM-KQKN552',
									events: {
										sendUserInfo: 'Finalizou remarcação teleconsulta',
									},
								};

								TagManager.initialize(tagManagerArgs);
								amplitude
									.getInstance()
									.logEvent('Finalizou remarcação teleconsulta');
								confirmHealthAppointment();
							}}
							fontSize={'xxs'}
							leftIcon={<MdCheckCircle />}
							color="primary"
							variant="contained">
							{translations['pt-br'].bookingFlow.buttonSchedule}
						</S.ButtonScheduleHealth>
					</S.FooterCardButtons>

					<FailureToLoadModal isModalOpen={showError} setIsModalOpen={setShowError} />
				</>
			)}
		</>
	);
};
