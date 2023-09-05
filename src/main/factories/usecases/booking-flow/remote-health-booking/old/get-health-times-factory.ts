import {GetMedicalTimes} from 'domain/usecases';
import {RemoteGetMedicalTimes} from 'data/usecases';
import {makeBFFApiUrl} from 'main/factories/http';
import {makeAuthorizeHttpClientDecorator} from 'main/factories/decorators';
import {bookingFlowEndPoints} from '../../endpoints';

export const makeGetMedicalTimes = (): GetMedicalTimes =>
	new RemoteGetMedicalTimes(
		makeBFFApiUrl(bookingFlowEndPoints.medicalTimes),
		makeAuthorizeHttpClientDecorator(),
	);
