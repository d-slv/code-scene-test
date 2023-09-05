import {GetCitiesDentalGuide} from 'domain/usecases';
import {RemoteGetCitiesDentalGuide} from 'data/usecases';
import {makeBFFApiUrl} from 'main/factories/http';
import {makeAuthorizeHttpClientDecorator} from 'main/factories/decorators';
import {guideFlowEndpoints} from '../../endpoints';

export const makeGetCitiesDentalGuide = (): GetCitiesDentalGuide =>
	new RemoteGetCitiesDentalGuide(
		makeBFFApiUrl(guideFlowEndpoints.odontoGuideCities),
		makeAuthorizeHttpClientDecorator(),
	);
