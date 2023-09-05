/* eslint-disable default-case */
import React, {useRef, useEffect} from 'react';
import moment from 'moment';
import {useRecoilValue, useSetRecoilState} from 'recoil';
import {
	healthBookingStates,
	markdownHealthStates,
	scheduledHealthStates,
} from 'presentation/pages/states/atoms';
import {MdDownload} from 'react-icons/md';
import {useNavigate} from 'react-router-dom';
import {formatText} from 'presentation/utils';
import {translations} from 'presentation/translations';
import {Button} from 'presentation/components/button/button';
import {printAppointment} from 'presentation/utils/utilFunctions';
import {ButtonEventProps} from 'presentation/components/add-to-calendar-button';
import AddToCalendarButton from 'presentation/components/add-to-calendar-button/add-to-calendar-button';
import {Ticket} from 'presentation/components/ticket';
import {ConsultationTypeEnum} from 'presentation/constants/bookingTypesEnum';
import {refresherIdState} from 'presentation/pages/entry-flow/atoms';
import * as S from './styles';

const localTranslations = translations['pt-br'].bookingFlow;

export const MedicalBookingCompleted: React.FC = () => {
	const printRef = useRef();
	const navigate = useNavigate();
	const healthBooking = useRecoilValue(healthBookingStates);
	const replaceHealth = useRecoilValue(markdownHealthStates);
	const stateScheduled = useRecoilValue(scheduledHealthStates);
	const setRefresherId = useSetRecoilState(refresherIdState);

	function handleRefresher() {
		setRefresherId(val => val + 1);
	}

	useEffect(() => {
		if (
			healthBooking.flReagendamento === true &&
			!healthBooking.nmPrestadorJuridicoAux.includes('DIGITAL')
		) {
			document.title = localTranslations.titleReplacedHealth;
		} else if (
			healthBooking.flReagendamento === true &&
			healthBooking.nmPrestadorJuridicoAux.includes('DIGITAL')
		) {
			document.title = localTranslations.titleReplacedTelemedicine;
		} else if (
			healthBooking.flReagendamento === false &&
			healthBooking.nmPrestadorJuridicoAux.includes('DIGITAL')
		) {
			document.title = localTranslations.titleScheduledTelemedicine;
		} else {
			document.title = localTranslations.titleScheduledHealth;
		}
		handleRefresher();
	}, []);

	const dateAppointment = moment(
		`${healthBooking.dtConsulta}${healthBooking.horarioConsulta}`,
		'D/M/YYYY HH:mm',
	).format('YYYY/MM/DD HH:mm');

	const location = `${String(healthBooking.nmLogradouro).trim().toLowerCase()},${' '}
	${healthBooking.nmBairro && String(healthBooking.nmBairro).trim().toLowerCase()}${' '}
	- ${formatText(healthBooking.nmCidadeAux)} -${' '}
	${healthBooking.cdUfAux}`;

	const appointmentEvent: ButtonEventProps = {
		title: `${localTranslations.appointmentEventTitle} ${formatText(
			healthBooking.nmEspecialidadeAux,
		)}`,
		startDate: new Date(dateAppointment),
		durationInMinutes: 15,
		description: `${formatText(healthBooking.nmPrestadorJuridicoAux)} - ${formatText(
			healthBooking.nmPrestadorFisicoAux,
		)}\n\n${localTranslations.appointmentEventTitle}`,
		address: location,
	};

	const titleOptions = (): string => {
		const isRebooking = healthBooking.flReagendamento;
		const isTeleconsultation = healthBooking.nmPrestadorJuridicoAux.includes('DIGITAL');

		if (!isRebooking && isTeleconsultation) return localTranslations.scheduledTelemedicineTitle;
		if (!isRebooking && !isTeleconsultation) return localTranslations.scheduledHealthTitle;
		if (isRebooking && isTeleconsultation) return localTranslations.replacedTelemedicineTitle;

		return localTranslations.replacedHealthTitle;
	};

	return (
		<>
			<div ref={printRef}>
				<Ticket
					ticketTitle={titleOptions()}
					appointmentDate={`${healthBooking.dtConsulta} ${healthBooking.horarioConsulta}`}
					nmPrestadorJuridico={healthBooking.nmPrestadorJuridicoAux}
					nmPrestadorFisico={healthBooking.nmPrestadorFisicoAux}
					nuProtocolo={
						!healthBooking.flReagendamento ? healthBooking.nuProtocolo : null
						// : replaceHealth.data.reagendamento.nuProtocolo
					}
					// nuTelefones={
					// 	Array.isArray(healthBooking.nuTelefone)
					// 		? healthBooking.nuTelefone
					// 		: [healthBooking.nuTelefone]
					// }
					dsEspecialidade={healthBooking.nmEspecialidadeAux}
					tipoConsulta={
						healthBooking.nmPrestadorJuridicoAux.includes('DIGITAL')
							? ConsultationTypeEnum.TELECONSULTATION
							: ConsultationTypeEnum.HEALTH
					}
					separatedAddress={{
						type: null,
						address: healthBooking.nmLogradouro,
						number: healthBooking.cdNumero,
						district: healthBooking.nmBairro,
						city: healthBooking.nmCidadeAux,
						state: healthBooking.cdUfAux,
						complement: null,
						reference: null,
					}}
				/>
			</div>

			<S.UtilButtons>
				<Button
					spacingInsetY={'xs'}
					spacingInsetX={'sm'}
					color="SecondaryBlue.500"
					leftIcon={<MdDownload />}
					onClick={() => {
						printAppointment(printRef);
					}}>
					{localTranslations.buttonDownloadVoucher}
				</Button>
				<AddToCalendarButton calendarEvent={appointmentEvent} />
				<Button
					spacingInsetY={'xs'}
					spacingInsetX={'sm'}
					onClick={() => navigate('/minhas-consultas')}>
					{localTranslations.buttonSeeMyAppointments}
				</Button>
			</S.UtilButtons>
		</>
	);
};
