import {GetMedicalStates} from 'domain/usecases';
import {RemoteGetMedicalStates} from 'data/usecases';
import {makeBFFApiUrl} from 'main/factories/http';
import {makeAuthorizeHttpClientDecorator} from 'main/factories/decorators';
import {bookingFlowEndPoints} from '../../endpoints';

export const makeGetMedicalStates = (): GetMedicalStates =>
	new RemoteGetMedicalStates(
		makeBFFApiUrl(bookingFlowEndPoints.medicalStates),
		makeAuthorizeHttpClientDecorator(),
	);
