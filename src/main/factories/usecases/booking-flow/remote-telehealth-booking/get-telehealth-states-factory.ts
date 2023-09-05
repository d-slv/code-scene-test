import {GetTelehealthStates} from 'domain/usecases';
import {RemoteGetTelehealthStates} from 'data/usecases';
import {makeBFFApiUrl} from 'main/factories/http';
import {makeAuthorizeHttpClientDecorator} from 'main/factories/decorators';
import {bookingFlowEndPoints} from '../../endpoints';

export const makeGetTelehealthStates = (): GetTelehealthStates =>
	new RemoteGetTelehealthStates(
		makeBFFApiUrl(bookingFlowEndPoints.teleStates),
		makeAuthorizeHttpClientDecorator(),
	);
