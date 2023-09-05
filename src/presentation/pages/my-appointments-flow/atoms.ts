import {atom, selectorFamily} from 'recoil';

import {AgendamentoConsulta} from 'domain/usecases';
import {makeLocalStorageAdapter} from 'main/factories/cache';
import {ConsultationTypeEnum} from 'presentation/constants/bookingTypesEnum';
import {homeState} from '../entry-flow/atoms';

export const appointmentDetailsState = atom<AgendamentoConsulta>({
	key: 'appointmentDetails',
	default: null,
	effects: [
		({onSet, setSelf}) => {
			const storedAppointmentData = makeLocalStorageAdapter().get('appointmentDetails');
			if (storedAppointmentData !== null) setSelf(storedAppointmentData);

			onSet((newAppointmentData, _, isReset) =>
				isReset
					? makeLocalStorageAdapter().set('appointmentDetails')
					: makeLocalStorageAdapter().set('appointmentDetails', newAppointmentData),
			);
		},
	],
});

export const filteredAppointmentsState = selectorFamily({
	key: 'filteredAppointments',
	get:
		option =>
		({get}) => {
			const {agendamentosSaude} = get(homeState);
			const {agendamentosOdonto} = get(homeState);
			const {agendamentosTeleconsulta} = get(homeState);

			const appointments = agendamentosSaude.concat(
				agendamentosOdonto,
				agendamentosTeleconsulta,
			);

			switch (option) {
				case 'Saúde':
					return appointments.filter(
						appointment => appointment.tipoConsulta === ConsultationTypeEnum.HEALTH,
					);
				case 'Odontológicas':
					return appointments.filter(
						appointment => appointment.tipoConsulta === ConsultationTypeEnum.ODONTO,
					);
				case 'Teleconsulta':
					return appointments.filter(
						appointment =>
							appointment.telemedicina === 'S' ||
							appointment.tipoConsulta === ConsultationTypeEnum.TELECONSULTATION,
					);
				case 'Todos':
					return appointments;

				default:
					return appointments;
			}
		},
});
