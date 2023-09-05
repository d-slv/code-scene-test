import {PostMedicalBookingConfirm} from 'domain/usecases';
import {RemotePostMedicalBookingConfirm} from 'data/usecases';
import {makeBFFApiUrl} from 'main/factories/http';
import {makeAuthorizeHttpClientDecorator} from 'main/factories/decorators';
import {bookingFlowEndPoints} from '../../endpoints';

export const makePostMedicalBookingConfirm = (): PostMedicalBookingConfirm =>
	new RemotePostMedicalBookingConfirm(
		makeBFFApiUrl(bookingFlowEndPoints.medicalBookingConfirm),
		makeAuthorizeHttpClientDecorator(),
	);
