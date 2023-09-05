import {GetMedicalExternalUrl} from 'domain/usecases';
import {RemoteGetMedicalExternalUrl} from 'data/usecases';
import {makeBFFApiUrl} from 'main/factories/http';
import {makeAuthorizeHttpClientDecorator} from 'main/factories/decorators';
import {bookedFlowEndPoints} from '../../endpoints';

export const makeGetMedicalExternalUrl = (): GetMedicalExternalUrl =>
	new RemoteGetMedicalExternalUrl(
		makeBFFApiUrl(bookedFlowEndPoints.medicalExternalUrl),
		makeAuthorizeHttpClientDecorator(),
	);
