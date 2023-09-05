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
import {healthMarkdownStates, markdownHealthStates} from 'presentation/pages/states/atoms';
import {Ticket} from 'presentation/components/ticket';
import AddToCalendarButton from 'presentation/components/add-to-calendar-button/add-to-calendar-button';
import * as S from './styles';

export const MedicalMarkdownCompleted: React.FC = () => {
	const printRef = useRef();
	const navigate = useNavigate();

	const healthMarkdown = useRecoilValue(healthMarkdownStates);
	const stateScheduled = useRecoilValue(markdownHealthStates);

	const dateAppointment = moment(
		`${healthMarkdown.dtConsulta}${healthMarkdown.horarioConsulta}`,
		'D/M/YYYY HH:mm',
	).format('YYYY/MM/DD HH:mm');

	const location = `${String(healthMarkdown.nmLogradouro).trim().toLowerCase()},${' '}
	${healthMarkdown.nmBairro && String(healthMarkdown.nmBairro).trim().toLowerCase()}${' '}
	- ${formatText(healthMarkdown.nmCidadeAux)} -${' '}
	${healthMarkdown.cdUfAux}`;

	const appointmentEvent: ButtonEventProps = {
		title: `Consulta em Hapvida para ${formatText(healthMarkdown.nmEspecialidadeAux)}`,
		startDate: new Date(dateAppointment),
		durationInMinutes: 15,
		description: `${formatText(healthMarkdown.nmPrestadorJuridicoAux)} - ${formatText(
			healthMarkdown.nmPrestadorFisicoAux,
		)}\n\nNo dia da consulta, apresente um documento com foto ao chegar no local de atendimento!`,
		address: location,
	};

	return (
		<>
			<div ref={printRef}>
				<Ticket
					ticketTitle={translations['pt-br'].bookingFlow.replacedHealthTitle}
					appointmentDate={`${healthMarkdown.dtConsulta} ${healthMarkdown.horarioConsulta}`}
					nmPrestadorJuridico={healthMarkdown.nmPrestadorJuridicoAux}
					nmPrestadorFisico={healthMarkdown.nmPrestadorFisicoAux}
					nuProtocolo={'0'}
					dsEspecialidade={healthMarkdown.nmEspecialidadeAux}
					tipoConsulta={'saúde'}
					separatedAddress={{
						type: null,
						address: healthMarkdown.nmLogradouro,
						number: healthMarkdown.cdNumero,
						district: healthMarkdown.nmBairro,
						city: healthMarkdown.nmCidadeAux,
						state: healthMarkdown.cdUfAux,
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
