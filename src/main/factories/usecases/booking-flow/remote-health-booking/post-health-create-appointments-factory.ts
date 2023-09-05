import {PostMedicalCreateAppointment} from 'domain/usecases';
import {RemotePostMedicalCreateAppointment} from 'data/usecases';
import {makeBFFApiUrl} from 'main/factories/http';
import {makeAuthorizeHttpClientDecorator} from 'main/factories/decorators';
import {bookingFlowEndPoints} from '../../endpoints';

export const makePostMedicalCreateAppointment = (): PostMedicalCreateAppointment =>
	new RemotePostMedicalCreateAppointment(
		makeBFFApiUrl(bookingFlowEndPoints.medicalBookingConfirm),
		makeAuthorizeHttpClientDecorator(),
	);
