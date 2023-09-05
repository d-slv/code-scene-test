import React, {useEffect, useState} from 'react';
import amplitude from 'amplitude-js';
import {useRecoilState, useSetRecoilState} from 'recoil';
import TagManager from 'react-gtm-module';
import {useNavigate} from 'react-router-dom';
import {MdCheckCircle} from 'react-icons/md';
import moment from 'moment';

import {formatText} from 'presentation/utils';
import {PostExamsRebook} from 'domain/usecases';
import {translations} from 'presentation/translations';
import {FailureToLoadModal} from 'presentation/components/failure-to-load';
import {refresherIdState} from 'presentation/pages/entry-flow/atoms';
import {examBookingState} from 'presentation/pages/booking-flow/exam-booking/atoms';
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

interface Step4Props {
	onBackClick: () => void;
	rebooking: PostExamsRebook;
}

export const Step4: React.FC<Step4Props> = ({rebooking, onBackClick}) => {
	const navigate = useNavigate();
	const [showError, setShowError] = useState(false);

	const [examBooking, setExamBooking] = useRecoilState(examBookingState);

	const setRefresherId = useSetRecoilState(refresherIdState);

	const dateAppointment = moment(
		`${examBooking.dtData}${examBooking.horarioAgendamento}`,
		'D/M/YYYY HH:mm',
	).format('DD/MM/YY [às] HH:mm');

	function handleRefresher() {
		setRefresherId(val => val + 1);
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

	function handleNextClick() {
		rebookingAppointment();
	}

	useEffect(() => {
		document.title = translations['pt-br'].bookingFlow.titleStepConcludeExamReschedule;
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
