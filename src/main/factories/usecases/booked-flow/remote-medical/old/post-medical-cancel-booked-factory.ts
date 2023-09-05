import {PostMedicalCancel} from 'domain/usecases';
import {RemotePostMedicalCancel} from 'data/usecases';
import {makeBFFApiUrl} from 'main/factories/http';
import {makeAuthorizeHttpClientDecorator} from 'main/factories/decorators';
import {bookedFlowEndPoints} from '../../endpoints';

export const makePostMedicalCancelBooked = (): PostMedicalCancel =>
	new RemotePostMedicalCancel(
		makeBFFApiUrl(bookedFlowEndPoints.medicalCancel),
		makeAuthorizeHttpClientDecorator(),
	);
