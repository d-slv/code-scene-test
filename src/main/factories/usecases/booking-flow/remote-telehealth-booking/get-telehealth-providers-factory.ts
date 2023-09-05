import {GetTelehealthProviders} from 'domain/usecases';
import {RemoteGetTelehealthProviders} from 'data/usecases';
import {makeBFFApiUrl} from 'main/factories/http';
import {makeAuthorizeHttpClientDecorator} from 'main/factories/decorators';
import {bookingFlowEndPoints} from '../../endpoints';

export const makeGetTelehealthProviders = (): GetTelehealthProviders =>
	new RemoteGetTelehealthProviders(
		makeBFFApiUrl(bookingFlowEndPoints.teleProviders),
		makeAuthorizeHttpClientDecorator(),
	);
