import {GetMedicalExternalUrl} from 'domain/usecases';
import {RemoteGetMedicalExternalUrl} from 'data/usecases';
import {makeBFFApiUrl} from 'main/factories/http';
import {makeAuthorizeHttpClientDecorator} from 'main/factories/decorators';
import {externalLinkPoint} from '../../endpoints';

export const makeGetMedicalExternalUrl = (): GetMedicalExternalUrl =>
	new RemoteGetMedicalExternalUrl(
		makeBFFApiUrl(externalLinkPoint.teleconsultation),
		makeAuthorizeHttpClientDecorator(),
	);
