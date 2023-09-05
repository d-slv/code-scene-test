import {PostOdontoBookingConfirm} from 'domain/usecases';
import {RemotePostOdontoBookingConfirm} from 'data/usecases';
import {makeBFFApiUrl} from 'main/factories/http';
import {makeAuthorizeHttpClientDecorator} from 'main/factories/decorators';
import {bookingFlowEndPoints} from '../../endpoints';

export const makePostOdontoBookingConfirm = (): PostOdontoBookingConfirm =>
	new RemotePostOdontoBookingConfirm(
		makeBFFApiUrl(bookingFlowEndPoints.odontoBookingConfirm),
		makeAuthorizeHttpClientDecorator(),
	);
