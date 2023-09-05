import React, {useRef, useEffect} from 'react';
import moment from 'moment';
import {useRecoilValue} from 'recoil';
import {MdDownload} from 'react-icons/md';
import {useNavigate} from 'react-router-dom';

import {formatText} from 'presentation/utils';
import {translations} from 'presentation/translations';
import {Button} from 'presentation/components/button/button';
import {printAppointment} from 'presentation/utils/utilFunctions';
import {ButtonEventProps} from 'presentation/components/add-to-calendar-button';
import {Ticket} from 'presentation/components/ticket';
import AddToCalendarButton from 'presentation/components/add-to-calendar-button/add-to-calendar-button';
import {examBookingState} from '../../atoms';
import {UtilButtons} from './styles';

export const ExamBookingCompleted = () => {
	const printRef = useRef();
	const navigate = useNavigate();
	const examBooking = useRecoilValue(examBookingState);

	const dateAppointment = moment(
		`${examBooking.dtData}${examBooking.horarioAgendamento}`,
		'D/M/YYYY HH:mm',
	).format('DD/MM/YY [às] HH:mm');

	const location = `${String(examBooking.nmLogradouro).trim().toLowerCase()},${' '}
	${String(examBooking.cdNumero).trim().toLowerCase()},${' '}
	${examBooking.nmBairro && examBooking.nmBairro.trim().toLowerCase()}${' '}
	- ${formatText(examBooking.nmCidade)} -${' '}
	${examBooking.cdUf}`;

	const appointmentEvent: ButtonEventProps = {
		title: `${translations['pt-br'].bookingFlow.appointmentEventExamTitle} ${formatText(
			examBooking.dsTipoExame,
		)}`,
		startDate: new Date(dateAppointment),
		durationInMinutes: 15,
		description: `${formatText(examBooking.nmPrestadorJuridicoAux)} - ${formatText(
			examBooking.nmPrestadorFisico,
		)}\n\n${translations['pt-br'].bookingFlow.appointmentEventExamTitle}`,
		address: location,
	};

	useEffect(() => {
		if (examBooking.flReagendamento === false) {
			document.title = translations['pt-br'].bookingFlow.titleScheduledExam;
		} else {
			document.title = translations['pt-br'].bookingFlow.titleReplacedExam;
		}
	}, []);

	return (
		<>
			<div ref={printRef}>
				<Ticket
					ticketTitle={
						!examBooking.flReagendamento
							? translations['pt-br'].bookingFlow.scheduledExamTitle
							: translations['pt-br'].bookingFlow.replacedExamTitle
					}
					appointmentDate={`${examBooking.dtData} às ${examBooking.horarioAgendamento}`}
					nmPrestadorJuridico={examBooking.nmPrestadorJuridicoAux}
					nmPrestadorFisico={examBooking.nmPrestadorFisico}
					nuProtocolo={
						!examBooking.flReagendamento
							? examBooking.protocoloAgendamento
							: examBooking.protocoloReagendamento
					}
					nmTipoExame={examBooking.dsTipoExame}
					dsDescricao={examBooking.dsDescricao}
					separatedAddress={{
						type: null,
						address: examBooking.nmLogradouro,
						number: examBooking.cdNumero,
						district: examBooking.nmBairro,
						city: examBooking.nmCidade,
						state: examBooking.cdUf,
						complement: null,
						reference: null,
					}}
				/>
			</div>

			<UtilButtons>
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
					onClick={() => navigate('/meus-exames')}>
					{translations['pt-br'].bookingFlow.buttonSeeMyExams}
				</Button>
			</UtilButtons>
		</>
	);
};
