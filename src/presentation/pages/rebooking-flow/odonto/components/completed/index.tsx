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
import {odontoMarkdownStates, markdownOdontoStates} from 'presentation/pages/states/atoms';
import {Ticket} from 'presentation/components/ticket';
import AddToCalendarButton from 'presentation/components/add-to-calendar-button/add-to-calendar-button';
import {ConsultationTypeEnum} from 'presentation/constants/bookingTypesEnum';
import * as S from './styles';

export const OdontoMarkdownCompleted: React.FC = () => {
	const printRef = useRef();
	const navigate = useNavigate();

	const odontoMarkdown = useRecoilValue(odontoMarkdownStates);
	const stateScheduled = useRecoilValue(markdownOdontoStates);

	const dateAppointment = moment(
		`${odontoMarkdown.dtConsulta}${odontoMarkdown.horarioConsulta}`,
		'D/M/YYYY HH:mm',
	).format('YYYY/MM/DD HH:mm');

	const location = `${String(odontoMarkdown.nmLogradouro).trim().toLowerCase()},${' '}
	${odontoMarkdown.nmBairro && String(odontoMarkdown.nmBairro).trim().toLowerCase()}${' '}
	- ${formatText(odontoMarkdown.nmCidadeAux)} -${' '}
	${odontoMarkdown.cdUfAux}`;

	const appointmentEvent: ButtonEventProps = {
		title: `Consulta em Hapvida para ${formatText(odontoMarkdown.nmEspecialidadeAux)}`,
		startDate: new Date(dateAppointment),
		durationInMinutes: 15,
		description: `${formatText(odontoMarkdown.nmPrestadorJuridicoAux)} - ${formatText(
			odontoMarkdown.nmPrestadorFisicoAux,
		)}\n\nNo dia da consulta, apresente um documento com foto ao chegar no local de atendimento!`,
		address: location,
	};

	return (
		<>
			<div ref={printRef}>
				<Ticket
					ticketTitle={translations['pt-br'].bookingFlow.replacedOdontoTitle}
					appointmentDate={`${odontoMarkdown.dtConsulta} ${odontoMarkdown.horarioConsulta}`}
					nmPrestadorJuridico={odontoMarkdown.nmPrestadorJuridicoAux}
					nmPrestadorFisico={odontoMarkdown.nmPrestadorFisicoAux}
					nuProtocolo={stateScheduled.data.reagendamento.nuProtocolo}
					dsEspecialidade={odontoMarkdown.nmEspecialidadeAux}
					tipoConsulta={ConsultationTypeEnum.ODONTO}
					separatedAddress={{
						type: null,
						address: odontoMarkdown.nmLogradouro,
						district: odontoMarkdown.nmBairroAux,
						city: odontoMarkdown.nmCidadeAux,
						state: odontoMarkdown.cdUfAux,
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
