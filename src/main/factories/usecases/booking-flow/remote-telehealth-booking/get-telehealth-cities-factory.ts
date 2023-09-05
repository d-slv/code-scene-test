import {GetTelehealthCities} from 'domain/usecases';
import {RemoteGetTelehealthCities} from 'data/usecases';
import {makeBFFApiUrl} from 'main/factories/http';
import {makeAuthorizeHttpClientDecorator} from 'main/factories/decorators';
import {bookingFlowEndPoints} from '../../endpoints';

export const makeGetTelehealthCities = (): GetTelehealthCities =>
	new RemoteGetTelehealthCities(
		makeBFFApiUrl(bookingFlowEndPoints.teleCities),
		makeAuthorizeHttpClientDecorator(),
	);
