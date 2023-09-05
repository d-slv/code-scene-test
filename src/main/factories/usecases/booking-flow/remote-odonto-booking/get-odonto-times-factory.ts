import {GetOdontoTimes} from 'domain/usecases';
import {RemoteGetOdontoTimes} from 'data/usecases';
import {makeBFFApiUrl} from 'main/factories/http';
import {makeAuthorizeHttpClientDecorator} from 'main/factories/decorators';
import {bookingFlowEndPoints} from '../../endpoints';

export const makeGetOdontoTimes = (): GetOdontoTimes =>
	new RemoteGetOdontoTimes(
		makeBFFApiUrl(bookingFlowEndPoints.odontoTimes),
		makeAuthorizeHttpClientDecorator(),
	);
