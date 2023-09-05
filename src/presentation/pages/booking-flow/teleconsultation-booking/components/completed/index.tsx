import React, {useEffect, useRef} from 'react';
import moment from 'moment';
import {useRecoilValue} from 'recoil';
import {
	telehealthBookingStates,
	markdownTelehealthStates,
	scheduledTelehealthStates,
} from 'presentation/pages/states/atoms';
import {MdDownload} from 'react-icons/md';
import {useNavigate} from 'react-router-dom';
import {formatText} from 'presentation/utils';
import {translations} from 'presentation/translations';
import {Button} from 'presentation/components/button/button';
import {printAppointment} from 'presentation/utils/utilFunctions';
import {ButtonEventProps} from 'presentation/components/add-to-calendar-button';
import {Ticket} from 'presentation/components/ticket';
import AddToCalendarButton from 'presentation/components/add-to-calendar-button/add-to-calendar-button';
import {ConsultationTypeEnum} from 'presentation/constants/bookingTypesEnum';
import * as S from './styles';

export const TeleconsultationBookingCompleted: React.FC = () => {
	const printRef = useRef();
	const navigate = useNavigate();

	const stateScheduled = useRecoilValue(scheduledTelehealthStates);
	const telehealthBooking = useRecoilValue(telehealthBookingStates);
	const replaceTelehealth = useRecoilValue(markdownTelehealthStates);

	useEffect(() => {
		if (telehealthBooking.flReagendamento === false) {
			document.title = translations['pt-br'].bookingFlow.titleScheduledTelemedicine;
		} else {
			document.title = translations['pt-br'].bookingFlow.replacedTelemedicineTitle;
		}
	}, []);

	const dateAppointment = moment(
		`${telehealthBooking.dtConsulta}${telehealthBooking.horarioConsulta}`,
		'D/M/YYYY HH:mm',
	).format('YYYY/MM/DD HH:mm');

	const appointmentEvent: ButtonEventProps = {
		title: `${translations['pt-br'].bookingFlow.appointmentEventTitle} ${formatText(
			telehealthBooking.nmEspecialidadeAux,
		)}`,
		startDate: new Date(dateAppointment),
		durationInMinutes: 15,
		description: `${formatText(telehealthBooking.nmPrestadorJuridicoAux)} - ${formatText(
			telehealthBooking.nmPrestadorFisicoAux,
		)}\n\n${translations['pt-br'].bookingFlow.appointmentEventinfo}`,
	};

	return (
		<>
			<div ref={printRef}>
				<Ticket
					ticketTitle={
						!telehealthBooking.flReagendamento
							? translations['pt-br'].bookingFlow.scheduledTelemedicineTitle
							: translations['pt-br'].bookingFlow.replacedTelemedicineTitle
					}
					appointmentDate={`${telehealthBooking.dtConsulta} ${telehealthBooking.horarioConsulta}`}
					nmPrestadorJuridico={telehealthBooking.nmPrestadorJuridicoAux}
					nmPrestadorFisico={telehealthBooking.nmPrestadorFisicoAux}
					nuProtocolo={
						!telehealthBooking.flReagendamento
							? stateScheduled.data.consultaMarcada.nuProtocolo
							: replaceTelehealth.data.reagendamento.nuProtocolo
					}
					// nuTelefones={
					// 	Array.isArray(telehealthBooking.nuTelefone)
					// 		? telehealthBooking.nuTelefone
					// 		: [telehealthBooking.nuTelefone]
					// }
					dsEspecialidade={telehealthBooking.nmEspecialidadeAux}
					tipoConsulta={ConsultationTypeEnum.TELECONSULTATION}
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
					{translations['pt-br'].bookingFlow.buttonDownloadVoucher}
				</Button>
				<AddToCalendarButton calendarEvent={appointmentEvent} />
				<Button
					spacingInsetY={'xs'}
					spacingInsetX={'sm'}
					onClick={() => navigate('/minhas-consultas')}>
					{translations['pt-br'].bookingFlow.buttonSeeMyAppointments}
				</Button>
			</S.UtilButtons>
		</>
	);
};
