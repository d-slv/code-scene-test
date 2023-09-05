import {GetMedicalAppointments} from 'domain/usecases';
import {RemoteGetMedicalAppointments} from 'data/usecases';
import {makeBFFApiUrl} from 'main/factories/http';
import {makeAuthorizeHttpClientDecorator} from 'main/factories/decorators';
import {bookedFlowEndPoints} from '../../endpoints';

export const makeGetMedicalAppointments = (): GetMedicalAppointments =>
	new RemoteGetMedicalAppointments(
		makeBFFApiUrl(bookedFlowEndPoints.medicalBooked),
		makeAuthorizeHttpClientDecorator(),
	);
