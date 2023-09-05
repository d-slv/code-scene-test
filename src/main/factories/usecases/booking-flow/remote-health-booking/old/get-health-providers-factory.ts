import {GetMedicalProviders} from 'domain/usecases';
import {RemoteGetMedicalProviders} from 'data/usecases';
import {makeBFFApiUrl} from 'main/factories/http';
import {makeAuthorizeHttpClientDecorator} from 'main/factories/decorators';
import {bookingFlowEndPoints} from '../../endpoints';

export const makeGetMedicalProviders = (): GetMedicalProviders =>
	new RemoteGetMedicalProviders(
		makeBFFApiUrl(bookingFlowEndPoints.medicalProviders),
		makeAuthorizeHttpClientDecorator(),
	);
