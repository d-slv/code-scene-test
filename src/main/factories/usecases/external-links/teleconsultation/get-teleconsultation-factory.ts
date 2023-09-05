import {GetTeleconsulLink} from 'domain/usecases';
import {RemoteGetTeleconsulLink} from 'data/usecases';
import {makeBFFApiUrl} from 'main/factories/http';
import {makeAuthorizeHttpClientDecorator} from 'main/factories/decorators';
import {externalLinkPoint} from '../../endpoints';

export const makeGetTeleconsultLink = (): GetTeleconsulLink =>
	new RemoteGetTeleconsulLink(
		makeBFFApiUrl(externalLinkPoint.teleconsultation),
		makeAuthorizeHttpClientDecorator(),
	);
