import {GetMedicalBooked} from 'domain/usecases';
import {RemoteGetMedicalBooked} from 'data/usecases';
import {makeBFFApiUrl} from 'main/factories/http';
import {makeAuthorizeHttpClientDecorator} from 'main/factories/decorators';
import {bookedFlowEndPoints} from '../../../endpoints';

export const makeGetMedicalBooked = (): GetMedicalBooked =>
	new RemoteGetMedicalBooked(
		makeBFFApiUrl(bookedFlowEndPoints.medicalBooked),
		makeAuthorizeHttpClientDecorator(),
	);
