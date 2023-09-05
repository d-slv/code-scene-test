import {PostTelehealthBooking} from 'domain/usecases';
import {RemotePostTelehealthBooking} from 'data/usecases';
import {makeBFFApiUrl} from 'main/factories/http';
import {makeAuthorizeHttpClientDecorator} from 'main/factories/decorators';
import {bookingFlowEndPoints} from '../../endpoints';

export const makePostTelehealthBooking = (): PostTelehealthBooking =>
	new RemotePostTelehealthBooking(
		makeBFFApiUrl(bookingFlowEndPoints.teleBookingConfirm),
		makeAuthorizeHttpClientDecorator(),
	);
