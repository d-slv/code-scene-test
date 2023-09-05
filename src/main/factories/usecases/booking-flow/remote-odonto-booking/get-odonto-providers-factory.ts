import {GetOdontoProviders} from 'domain/usecases';
import {RemoteGetOdontoProviders} from 'data/usecases';
import {makeBFFApiUrl} from 'main/factories/http';
import {makeAuthorizeHttpClientDecorator} from 'main/factories/decorators';
import {bookingFlowEndPoints} from '../../endpoints';

export const makeGetOdontoProviders = (): GetOdontoProviders =>
	new RemoteGetOdontoProviders(
		makeBFFApiUrl(bookingFlowEndPoints.odontoProviders),
		makeAuthorizeHttpClientDecorator(),
	);
