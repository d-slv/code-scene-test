import {GetMedicalCities} from 'domain/usecases';
import {RemoteGetMedicalCities} from 'data/usecases';
import {makeBFFApiUrl} from 'main/factories/http';
import {makeAuthorizeHttpClientDecorator} from 'main/factories/decorators';
import {bookingFlowEndPoints} from '../../endpoints';

export const makeGetMedicalCities = (): GetMedicalCities =>
	new RemoteGetMedicalCities(
		makeBFFApiUrl(bookingFlowEndPoints.medicalCities),
		makeAuthorizeHttpClientDecorator(),
	);
