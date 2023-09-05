import {GetMedicalSpecialties} from 'domain/usecases';
import {RemoteGetMedicalSpecialties} from 'data/usecases';
import {makeBFFApiUrl} from 'main/factories/http';
import {makeAuthorizeHttpClientDecorator} from 'main/factories/decorators';
import {bookingFlowEndPoints} from '../../endpoints';

export const makeGetMedicalSpecialties = (): GetMedicalSpecialties =>
	new RemoteGetMedicalSpecialties(
		makeBFFApiUrl(bookingFlowEndPoints.medicalSpecialties),
		makeAuthorizeHttpClientDecorator(),
	);
