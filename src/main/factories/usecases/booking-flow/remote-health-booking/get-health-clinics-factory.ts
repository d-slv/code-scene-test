import {GetMedicalClinics} from 'domain/usecases';
import {RemoteGetMedicalClinics} from 'data/usecases';
import {makeBFFApiUrl} from 'main/factories/http';
import {makeAuthorizeHttpClientDecorator} from 'main/factories/decorators';
import {bookingFlowEndPoints} from '../../endpoints';

export const makeGetMedicalClinics = (): GetMedicalClinics =>
	new RemoteGetMedicalClinics(
		makeBFFApiUrl(bookingFlowEndPoints.medicalProviders),
		makeAuthorizeHttpClientDecorator(),
	);
