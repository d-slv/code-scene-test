import {GetMedicalSpecialists} from 'domain/usecases';
import {RemoteGetMedicalSpecialists} from 'data/usecases';
import {makeBFFApiUrl} from 'main/factories/http';
import {makeAuthorizeHttpClientDecorator} from 'main/factories/decorators';
import {bookingFlowEndPoints} from '../../endpoints';

export const makeGetMedicalSpecialists = (): GetMedicalSpecialists =>
	new RemoteGetMedicalSpecialists(
		makeBFFApiUrl(bookingFlowEndPoints.medicalSpecialists),
		makeAuthorizeHttpClientDecorator(),
	);
