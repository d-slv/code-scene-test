import {PostMedicalRebook} from 'domain/usecases';
import {RemotePostMedicalRebook} from 'data/usecases';
import {makeBFFApiUrl} from 'main/factories/http';
import {makeAuthorizeHttpClientDecorator} from 'main/factories/decorators';
import {bookedFlowEndPoints} from '../../endpoints';

export const makePostMedicalRebook = (): PostMedicalRebook =>
	new RemotePostMedicalRebook(
		makeBFFApiUrl(bookedFlowEndPoints.medicalRebooking),
		makeAuthorizeHttpClientDecorator(),
	);
