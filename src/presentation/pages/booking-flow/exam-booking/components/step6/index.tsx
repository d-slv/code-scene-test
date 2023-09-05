import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import amplitude from 'amplitude-js';
import {useRecoilState, useRecoilValue, useSetRecoilState} from 'recoil';
import TagManager from 'react-gtm-module';
import {MdCheckCircle} from 'react-icons/md';
import moment from 'moment';

import {formatText} from 'presentation/utils';
import {translations} from 'presentation/translations';
import {PostExamsConfirm, PostExamsRebook} from 'domain/usecases';
import {FailureToLoadModal} from 'presentation/components/failure-to-load';
import {accountDataState, refresherIdState} from 'presentation/pages/entry-flow/atoms';

import {
	AbstractTitle,
	AppointmentInformation,
	CardAbstractTitle,
	CardSummaryDate,
	QuerySummaryCard,
	ResumeContent,
	SummaryContent,
	VerticalLine,
} from './styles';
import {FooterNavigation} from '../FooterNavigation';
import {examBookingState} from '../../atoms';

interface Step6Props {
	onBackClick: () => void;
	booking: PostExamsConfirm;
	rebooking: PostExamsRebook;
}

export const Step6: React.FC<Step6Props> = ({booking, rebooking, onBackClick}) => {
	const navigate = useNavigate();
	const [showError, setShowError] = useState(false);

	const [examBooking, setExamBooking] = useRecoilState(examBookingState);

	const {beneficiary} = useRecoilValue(accountDataState);

	const setRefresherId = useSetRecoilState(refresherIdState);

	const dateAppointment = moment(
		`${examBooking.dtData}${examBooking.horarioAgendamento}`,
		'D/M/YYYY HH:mm',
	).format('DD/MM/YY [às] HH:mm');

	function handleRefresher() {
		setRefresherId(val => val + 1);
	}

	async function confirmAppointment() {
		try {
			const {dsDescricao, dsInfoComplementar, nuProtocolo} = await booking.post({
				cdPrestadorFisico: String(examBooking.cdPrestadorFisico),
				cdPrestadorJuridico: String(examBooking.cdPrestadorJuridico),
				cdTipoExame: examBooking.cdTipoExame,
				dtAgendamento: examBooking.dtData,
				horarioAgendamento: examBooking.horarioAgendamento,
				nuIdade: beneficiary.idadeC,
				cdPontoEntrada: examBooking.cdPontoEntrada,
			});
			setExamBooking({
				...examBooking,
				protocoloAgendamento: nuProtocolo,
				dsDescricao,
				dsInfoComplementar,
			});
			handleRefresher();
			navigate('/meus-exames/marcar-exame/confirmacao');

			const tagManagerArgs = {
				gtmId: 'GTM-KQKN552',
				events: {
					sendUserInfo: 'Marcou Exame',
				},
			};

			TagManager.initialize(tagManagerArgs);
			amplitude.getInstance().logEvent('Marcou Exame');
		} catch {
			setShowError(true);
		}
	}

	async function rebookingAppointment() {
		try {
			const {reagendamentoExame} = await rebooking.post({
				cdPrestadorFisico: String(examBooking.cdPrestadorFisico),
				cdPrestadorJuridico: String(examBooking.cdPrestadorJuridico),
				cdTipoExame: examBooking.cdTipoExame,
				dtAgendamento: examBooking.dtData,
				horarioAgendamento: examBooking.horarioAgendamento,
				nuExame: String(examBooking.nuExame),
				cdPontoEntrada: examBooking.cdPontoEntrada,
			});
			setExamBooking({
				...examBooking,
				nuExameRemarcado: reagendamentoExame.nuExameRemarcado,
				protocoloCancelamento: reagendamentoExame.protocoloCancelamento,
				protocoloReagendamento: reagendamentoExame.protocoloAgendamento,
			});
			handleRefresher();
			navigate('/meus-exames/remarcar-exame/confirmacao');

			const tagManagerArgs = {
				gtmId: 'GTM-KQKN552',
				events: {
					sendUserInfo: 'Remarcou Exame',
				},
			};

			TagManager.initialize(tagManagerArgs);
			amplitude.getInstance().logEvent('Remarcou exame via marcação');
		} catch {
			setShowError(true);
		}
	}

	function checkScheduleType() {
		if (examBooking.flReagendamento === false) {
			confirmAppointment();
		} else {
			rebookingAppointment();
		}
	}

	function handleBackClick() {
		setExamBooking({
			...examBooking,
			nmPrestadorFisico: '',
			cdPrestadorFisico: undefined,
			horarioAgendamento: '',
		});
		onBackClick();
	}

	function handleNextClick() {
		checkScheduleType();
	}

	useEffect(() => {
		document.title = translations['pt-br'].bookingFlow.titleStepConcludeExam;
	}, []);

	return (
		<>
			<QuerySummaryCard topAccentcolor={'primary'} variant={'top-accent'}>
				<ResumeContent>
					<CardAbstractTitle>
						{`${translations['pt-br'].bookingFlow.examOf} ${examBooking.dsTipoExame}`}
					</CardAbstractTitle>
					<CardSummaryDate>{dateAppointment}</CardSummaryDate>
					<AppointmentInformation>
						<AbstractTitle>
							{translations['pt-br'].bookingFlow.beneficiary}
						</AbstractTitle>
						<SummaryContent>{formatText(examBooking.nmUsuario)}</SummaryContent>
					</AppointmentInformation>
				</ResumeContent>
				<VerticalLine />
				<ResumeContent>
					<AppointmentInformation>
						<AbstractTitle>{translations['pt-br'].bookingFlow.place}</AbstractTitle>
						<SummaryContent>
							{formatText(examBooking.nmPrestadorJuridicoAux)}
						</SummaryContent>
					</AppointmentInformation>
					<AppointmentInformation>
						<AbstractTitle>
							{translations['pt-br'].bookingFlow.responsible}
						</AbstractTitle>
						<SummaryContent>{formatText(examBooking.nmPrestadorFisico)}</SummaryContent>
					</AppointmentInformation>
				</ResumeContent>
			</QuerySummaryCard>

			<FooterNavigation
				handleBackClick={handleBackClick}
				handleNextClick={handleNextClick}
				backButtonText={translations['pt-br'].bookingFlow.buttonChangeHour}
				nextButtonText={translations['pt-br'].bookingFlow.buttonSchedule}
				leftIcon={<MdCheckCircle />}
				isLastStep
			/>

			<FailureToLoadModal isModalOpen={showError} setIsModalOpen={setShowError} />
		</>
	);
};
