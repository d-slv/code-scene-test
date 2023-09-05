import React from 'react';
import {useRecoilValue} from 'recoil';
import moment from 'moment';

import {CardEmpty} from 'presentation/components/card-empty/card-empty';
import {MyAppointmentsCard} from 'presentation/components/card-my-appointments';
import {Slider} from 'presentation/components/slider';

import {translations} from 'presentation/translations';
import {AgendamentoConsulta} from 'domain/usecases';
import {accountDataState, teleconsultationLinkState} from 'presentation/pages/entry-flow/atoms';
import {formatAddress} from 'presentation/components/ticket/ticket-utils';
import {filteredAppointmentsState} from '../atoms';

export type Options = 'Saúde' | 'Odontológicas' | 'Teleconsulta' | 'Todos';

interface AppointmentsListProps {
	selectedOption: Options;
	cancelOdontoAppointment: (code: string) => Promise<void>;
	cancelHealthAppointment: (code: string) => Promise<void>;
	handleGoToDetails: (data: AgendamentoConsulta) => void;
	handleReschedule: (type: string, data: AgendamentoConsulta) => void;
	handleConfirmAppointment: (obj: AgendamentoConsulta) => void;
}
function checkConfirm(value: string) {
	const referenceDate = moment();

	return moment(referenceDate, 'DD/MM/YYYY HH:mm:ss').isAfter(
		moment(value, 'DD/MM/YYYY HH:mm:ss').subtract(48, 'hours'),
	);
}

export function AppointmentsList({
	selectedOption,
	cancelOdontoAppointment,
	cancelHealthAppointment,
	handleConfirmAppointment,
	handleGoToDetails,
	handleReschedule,
}: AppointmentsListProps) {
	const appointments = useRecoilValue(filteredAppointmentsState(selectedOption));
	const {beneficiary} = useRecoilValue(accountDataState);
	const isEmpty = appointments.length === 0;
	const teleconsultationLink = useRecoilValue(teleconsultationLinkState(beneficiary.nuContrato));

	return (
		<>
			{isEmpty ? (
				<CardEmpty>{translations['pt-br'].appointmentsFlow.emptyHealthCard}</CardEmpty>
			) : (
				<Slider step={380} spaceBetween={32}>
					{appointments.map(appointment => (
						<MyAppointmentsCard
							link={teleconsultationLink}
							protocol={appointment.nuProtocolo}
							key={appointment.nuConsulta}
							phone={String(appointment.nuTelefone).trim()}
							confirmed={appointment.confirmado === 'Sim'}
							type={appointment.tipoConsulta}
							confirmationAppointmentDate={checkConfirm(appointment.dtConsulta)}
							dateAppointment={appointment.dtConsulta}
							patient={beneficiary.nmUsuarioC}
							doctor={appointment.nmPrestadorFisico}
							clinic={appointment.nmPrestadorJuridico}
							address={formatAddress({
								type: appointment.tipoLogradouro,
								address: appointment.logradouro,
								number: appointment.numero,
								district: appointment.bairro,
								city: appointment.nmCidade,
								state: appointment.cdUf,
								complement: appointment.complemento,
								reference: appointment.pontoReferencia,
							})}
							specialty={String(appointment.dsEspecialidade).trim()}
							cancelHealthAppointment={cancelHealthAppointment}
							cancelOdontoAppointment={cancelOdontoAppointment}
							appointmentNumber={String(appointment.nuConsulta)}
							onClickDetail={() => handleGoToDetails(appointment)}
							onClickMarkdown={() =>
								handleReschedule(appointment.tipoConsulta, appointment)
							}
							onClickIgo={() => handleConfirmAppointment(appointment)}
						/>
					))}
				</Slider>
			)}
		</>
	);
}
