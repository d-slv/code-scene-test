import React, {useRef, useEffect} from 'react';
import moment from 'moment';
import {useRecoilValue} from 'recoil';
import {
	odontoBookingStates,
	scheduledOdontoStates,
	markdownOdontoStates,
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

export const OdontoBookingCompleted: React.FC = () => {
	const printRef = useRef();
	const navigate = useNavigate();
	const odontoBooking = useRecoilValue(odontoBookingStates);
	const replaceOdonto = useRecoilValue(markdownOdontoStates);
	const stateScheduled = useRecoilValue(scheduledOdontoStates);

	useEffect(() => {
		if (odontoBooking.flReagendamento === false) {
			document.title = translations['pt-br'].bookingFlow.titleScheduledOdonto;
		} else {
			document.title = translations['pt-br'].bookingFlow.titleReplacedOdonto;
		}
	}, []);

	const dateAppointment = moment(
		`${odontoBooking.dtConsulta}${odontoBooking.horarioConsulta}`,
		'D/M/YYYY HH:mm',
	).format('YYYY/MM/DD HH:mm');

	const location = `${String(odontoBooking.nmLogradouro).trim().toLowerCase()},${' '}
	${odontoBooking.nmBairro && String(odontoBooking.nmBairro).trim().toLowerCase()}${' '}
	- ${formatText(odontoBooking.nmCidadeAux)} -${' '}
	${odontoBooking.cdUfAux}`;

	const appointmentEvent: ButtonEventProps = {
		title: `${translations['pt-br'].bookingFlow.appointmentEventTitle} ${formatText(
			odontoBooking.nmEspecialidadeAux,
		)}`,
		startDate: new Date(dateAppointment),
		durationInMinutes: 15,
		description: `${formatText(odontoBooking.nmPrestadorJuridicoAux)} - ${formatText(
			odontoBooking.nmPrestadorFisicoAux,
		)}\n\n${translations['pt-br'].bookingFlow.appointmentEventTitle}`,
		address: location,
	};

	return (
		<>
			<div ref={printRef}>
				<Ticket
					ticketTitle={
						!odontoBooking.flReagendamento
							? translations['pt-br'].bookingFlow.scheduledOdontoTitle
							: translations['pt-br'].bookingFlow.replacedOdontoTitle
					}
					appointmentDate={`${odontoBooking.dtConsulta} ${odontoBooking.horarioConsulta}`}
					nmPrestadorJuridico={odontoBooking.nmPrestadorJuridicoAux}
					nmPrestadorFisico={odontoBooking.nmPrestadorFisicoAux}
					nuProtocolo={
						!odontoBooking.flReagendamento
							? stateScheduled.data.consultaMarcada.nuProtocolo
							: replaceOdonto.data.reagendamento.nuProtocolo
					}
					dsEspecialidade={odontoBooking.nmEspecialidadeAux}
					tipoConsulta={ConsultationTypeEnum.ODONTO}
					separatedAddress={{
						type: null,
						address: odontoBooking.nmLogradouro,
						district: odontoBooking.nmBairroAux,
						city: odontoBooking.nmCidadeAux,
						state: odontoBooking.cdUfAux,
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
