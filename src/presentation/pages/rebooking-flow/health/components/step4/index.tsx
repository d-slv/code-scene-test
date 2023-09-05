import React, {useEffect, useState} from 'react';
import amplitude from 'amplitude-js';
import {useRecoilState} from 'recoil';
import TagManager from 'react-gtm-module';
import {useNavigate} from 'react-router-dom';
import {MdCheckCircle} from 'react-icons/md';
import {formatText} from 'presentation/utils';
import {PutMedicalRescheduleAppointment} from 'domain/usecases';
import {translations} from 'presentation/translations';
import {FailureToLoadModal} from 'presentation/components/failure-to-load';
import {healthMarkdownStates, markdownHealthStates} from 'presentation/pages/states/atoms';
import {Loading} from 'presentation/components/loading';
import * as S from './styles';

interface Step4Props {
	onBackClick: () => void;
	rebooking: PutMedicalRescheduleAppointment;
}

export const Step4: React.FC<Step4Props> = ({rebooking, onBackClick}) => {
	const navigate = useNavigate();
	const [showError, setShowError] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [healthMarkdown, setHealthMarkdown] = useRecoilState(healthMarkdownStates);
	const [stateScheduled, setStateScheduled] = useRecoilState(markdownHealthStates);

	useEffect(() => {
		document.title = translations['pt-br'].bookingFlow.titleStepConcludeReschedule;
	}, []);

	const confirmHealthAppointment = async (): Promise<void> => {
		setIsLoading(true);
		try {
			const confirmResult = await rebooking.put({
				number: healthMarkdown.nuConsulta,
				date: `${healthMarkdown.dtConsulta} ${healthMarkdown.horarioConsulta}`,
				providerCode: healthMarkdown.cdPrestadorFisico,
				clinicCode: healthMarkdown.cdPrestadorJuridico,
				specialtyCode: healthMarkdown.cdEspecialidade,
			});

			setStateScheduled({...stateScheduled, data: confirmResult});
			setIsLoading(false);
			navigate('/minhas-consultas/remarcar-consulta/confirmacao');
			const tagManagerArgs = {
				gtmId: 'GTM-KQKN552',
				events: {
					sendUserInfo: 'Remarcou saude',
				},
			};

			TagManager.initialize(tagManagerArgs);
			amplitude.getInstance().logEvent('Remarcou saude');
		} catch {
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
							<S.CardAbstractTitle>{`Consulta em: ${healthMarkdown.nmEspecialidadeAux}`}</S.CardAbstractTitle>
							<S.CardSummaryDate>{`${healthMarkdown.dtConsulta} às ${healthMarkdown.horarioConsulta}`}</S.CardSummaryDate>
							<S.AppointmentInformation>
								<S.AbstractTitle>
									{translations['pt-br'].bookingFlow.beneficiary}
								</S.AbstractTitle>
								<S.SummaryContent>
									{formatText(healthMarkdown.nmUsuarioAux)}
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
									{formatText(healthMarkdown.nmPrestadorJuridicoAux)}
								</S.SummaryContent>
							</S.AppointmentInformation>
							<S.AppointmentInformation>
								<S.AbstractTitle>
									{translations['pt-br'].bookingFlow.doctor}
								</S.AbstractTitle>
								<S.SummaryContent>
									{formatText(healthMarkdown.nmPrestadorFisicoAux)}
								</S.SummaryContent>
								<S.SpecialtySummary>
									{translations['pt-br'].bookingFlow.specialistDoctor}{' '}
									{healthMarkdown.nmEspecialidadeAux}
								</S.SpecialtySummary>
							</S.AppointmentInformation>
						</S.ResumeContent>
					</S.QuerySummaryCard>

					<S.FooterCardButtons>
						<S.ButtonScheduleHealth
							onClick={() => {
								onBackClick();
								setHealthMarkdown({
									...healthMarkdown,
									horarioConsulta: '',
								});
							}}
							fontSize={'xxs'}
							variant="outlined">
							{translations['pt-br'].bookingFlow.buttonChangeHour}
						</S.ButtonScheduleHealth>
						<S.ButtonScheduleHealth
							onClick={() => confirmHealthAppointment()}
							leftIcon={<MdCheckCircle />}
							color="primary"
							fontSize={'xxs'}
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
