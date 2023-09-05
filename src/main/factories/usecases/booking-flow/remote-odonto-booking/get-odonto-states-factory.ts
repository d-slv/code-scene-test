import {GetOdontoStates} from 'domain/usecases';
import {RemoteGetOdontoStates} from 'data/usecases';
import {makeBFFApiUrl} from 'main/factories/http';
import {makeAuthorizeHttpClientDecorator} from 'main/factories/decorators';
import {bookingFlowEndPoints} from '../../endpoints';

export const makeGetOdontoStates = (): GetOdontoStates =>
	new RemoteGetOdontoStates(
		makeBFFApiUrl(bookingFlowEndPoints.odontoStates),
		makeAuthorizeHttpClientDecorator(),
	);
