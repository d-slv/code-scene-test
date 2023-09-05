import React, {useEffect, useState} from 'react';
import amplitude from 'amplitude-js';
import {useRecoilState} from 'recoil';
import TagManager from 'react-gtm-module';
import {useNavigate} from 'react-router-dom';
import {MdCheckCircle} from 'react-icons/md';
import {formatText} from 'presentation/utils';
import {PostOdontoRebook} from 'domain/usecases';
import {translations} from 'presentation/translations';
import {FailureToLoadModal} from 'presentation/components/failure-to-load';
import {odontoMarkdownStates, markdownOdontoStates} from 'presentation/pages/states/atoms';
import {Loading} from 'presentation/components/loading';
import * as S from './styles';

interface Step4Props {
	onBackClick: () => void;
	rebooking: PostOdontoRebook;
}

export const Step4: React.FC<Step4Props> = ({rebooking, onBackClick}) => {
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false);
	const [showError, setShowError] = useState(false);
	const [odontoMarkdown, setOdontoMarkdown] = useRecoilState(odontoMarkdownStates);
	const [stateScheduled, setStateScheduled] = useRecoilState(markdownOdontoStates);

	useEffect(() => {
		document.title = translations['pt-br'].bookingFlow.titleStepConcludeReschedule;
	}, []);

	const confirmOdontoAppointment = async (): Promise<void> => {
		setIsLoading(true);
		try {
			const confirmResult = await rebooking.post({
				dtConsulta: odontoMarkdown.dtConsulta,
				nuConsulta: odontoMarkdown.nuConsulta,
				cdPontoEntrada: odontoMarkdown.cdPontoEntrada,
				horarioConsulta: odontoMarkdown.horarioConsulta,
				cdEspecialidade: odontoMarkdown.cdEspecialidade,
				cdPrestadorFisico: odontoMarkdown.cdPrestadorFisico,
				cdPrestadorJuridico: odontoMarkdown.cdPrestadorJuridico,
				cdSubEspecialidade: odontoMarkdown.cdSubEspecialidadeAux,
			});
			setStateScheduled({...stateScheduled, data: confirmResult});
			setIsLoading(false);
			navigate('/minhas-consultas/remarcar-dentista/confirmacao');
			const tagManagerArgs = {
				gtmId: 'GTM-KQKN552',
				events: {
					sendUserInfo: 'Remarcou odonto',
				},
			};

			TagManager.initialize(tagManagerArgs);
			amplitude.getInstance().logEvent('Remarcou odonto');
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
							<S.CardAbstractTitle>
								{`Consulta em: ${odontoMarkdown.nmEspecialidadeAux}`}
							</S.CardAbstractTitle>
							<S.CardSummaryDate>{`${odontoMarkdown.dtConsulta} às ${odontoMarkdown.horarioConsulta}`}</S.CardSummaryDate>
							<S.AppointmentInformation>
								<S.AbstractTitle>
									{translations['pt-br'].bookingFlow.beneficiary}
								</S.AbstractTitle>
								<S.SummaryContent>
									{formatText(odontoMarkdown.nmUsuarioAux)}
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
									{formatText(odontoMarkdown.nmPrestadorJuridicoAux)}
								</S.SummaryContent>
							</S.AppointmentInformation>
							<S.AppointmentInformation>
								<S.AbstractTitle>
									{translations['pt-br'].bookingFlow.dentist}
								</S.AbstractTitle>
								<S.SummaryContent>
									{formatText(odontoMarkdown.nmPrestadorFisicoAux)}
								</S.SummaryContent>
								<S.SpecialtySummary>
									{translations['pt-br'].bookingFlow.specialistDoctor}{' '}
									{odontoMarkdown.nmEspecialidadeAux}
								</S.SpecialtySummary>
							</S.AppointmentInformation>
						</S.ResumeContent>
					</S.QuerySummaryCard>

					<S.FooterCardButtons>
						<S.ButtonScheduleOdonto
							onClick={() => {
								onBackClick();
								setOdontoMarkdown({
									...odontoMarkdown,
									horarioConsulta: '',
								});
							}}
							fontSize={'xxs'}
							variant="outlined">
							{translations['pt-br'].bookingFlow.buttonChangeHour}
						</S.ButtonScheduleOdonto>
						<S.ButtonScheduleOdonto
							onClick={() => {
								confirmOdontoAppointment();
							}}
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
