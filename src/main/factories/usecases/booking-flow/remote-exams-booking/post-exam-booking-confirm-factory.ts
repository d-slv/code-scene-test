import {PostExamsConfirm} from 'domain/usecases';
import {RemotePostExamsConfirm} from 'data/usecases';
import {makeBFFApiUrl} from 'main/factories/http';
import {makeAuthorizeHttpClientDecorator} from 'main/factories/decorators';
import {bookingFlowEndPoints} from '../../endpoints';

export const makePostExamBooking = (): PostExamsConfirm =>
	new RemotePostExamsConfirm(
		makeBFFApiUrl(bookingFlowEndPoints.examBookingConfirm),
		makeAuthorizeHttpClientDecorator(),
	);
