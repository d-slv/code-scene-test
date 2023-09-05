import {GetTelehealthSpecialties} from 'domain/usecases';
import {RemoteGetTelehealthSpecialties} from 'data/usecases';
import {makeBFFApiUrl} from 'main/factories/http';
import {makeAuthorizeHttpClientDecorator} from 'main/factories/decorators';
import {bookingFlowEndPoints} from '../../endpoints';

export const makeGetTelehealthSpecialties = (): GetTelehealthSpecialties =>
	new RemoteGetTelehealthSpecialties(
		makeBFFApiUrl(bookingFlowEndPoints.teleSpecialties),
		makeAuthorizeHttpClientDecorator(),
	);
