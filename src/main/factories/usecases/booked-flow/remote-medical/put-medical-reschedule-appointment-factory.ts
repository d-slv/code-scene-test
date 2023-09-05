import {PutMedicalRescheduleAppointment} from 'domain/usecases';
import {RemotePutMedicalRescheduleAppointment} from 'data/usecases';
import {makeBFFApiUrl} from 'main/factories/http';
import {makeAuthorizeHttpClientDecorator} from 'main/factories/decorators';
import {bookedFlowEndPoints} from '../../endpoints';

export const makePutMedicalRescheduleAppointment = (): PutMedicalRescheduleAppointment =>
	new RemotePutMedicalRescheduleAppointment(
		makeBFFApiUrl(bookedFlowEndPoints.medicalRebooking),
		makeAuthorizeHttpClientDecorator(),
	);
