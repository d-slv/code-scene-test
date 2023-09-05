import {GetTelehealthTimes} from 'domain/usecases';
import {RemoteGetTelehealthTimes} from 'data/usecases';
import {makeBFFApiUrl} from 'main/factories/http';
import {makeAuthorizeHttpClientDecorator} from 'main/factories/decorators';
import {bookingFlowEndPoints} from '../../endpoints';

export const makeGetTelehealthTimes = (): GetTelehealthTimes =>
	new RemoteGetTelehealthTimes(
		makeBFFApiUrl(bookingFlowEndPoints.teleTimes),
		makeAuthorizeHttpClientDecorator(),
	);
