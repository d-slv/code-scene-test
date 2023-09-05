import React, {useRef} from 'react';
import moment from 'moment';
import {useRecoilValue} from 'recoil';
import {MdDownload} from 'react-icons/md';
import {useNavigate} from 'react-router-dom';
import {formatText} from 'presentation/utils';
import {translations} from 'presentation/translations';
import {Button} from 'presentation/components/button/button';
import {printAppointment} from 'presentation/utils/utilFunctions';
import {ButtonEventProps} from 'presentation/components/add-to-calendar-button';
import AddToCalendarButton from 'presentation/components/add-to-calendar-button/add-to-calendar-button';
import {Ticket} from 'presentation/components/ticket';
import {telehealthMarkdownStates, markdownTelehealthStates} from 'presentation/pages/states/atoms';
import {ConsultationTypeEnum} from 'presentation/constants/bookingTypesEnum';
import * as S from './styles';

export const TeleconsultationMarkdownCompleted: React.FC = () => {
	const printRef = useRef();
	const navigate = useNavigate();
	const stateScheduled = useRecoilValue(markdownTelehealthStates);
	const telehealthBooking = useRecoilValue(telehealthMarkdownStates);

	const dateAppointment = moment(
		`${telehealthBooking.dtConsulta}${telehealthBooking.horarioConsulta}`,
		'D/M/YYYY HH:mm',
	).format('YYYY/MM/DD HH:mm');

	const appointmentEvent: ButtonEventProps = {
		title: `Consulta em Hapvida para ${formatText(telehealthBooking.nmEspecialidadeAux)}`,
		startDate: new Date(dateAppointment),
		durationInMinutes: 15,
		description: `${formatText(telehealthBooking.nmPrestadorJuridicoAux)} - ${formatText(
			telehealthBooking.nmPrestadorFisicoAux,
		)}\n\nNo dia da consulta, apresente um documento com foto ao chegar no local de atendimento!`,
		address: telehealthBooking.enderecoAux.toLowerCase(),
	};

	return (
		<>
			<div ref={printRef}>
				<Ticket
					ticketTitle={translations['pt-br'].bookingFlow.replacedTelemedicineTitle}
					appointmentDate={`${telehealthBooking.dtConsulta} ${telehealthBooking.horarioConsulta}`}
					nmPrestadorJuridico={telehealthBooking.nmPrestadorJuridicoAux}
					nmPrestadorFisico={telehealthBooking.nmPrestadorFisicoAux}
					nuProtocolo={stateScheduled.data.reagendamento.nuProtocolo}
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
