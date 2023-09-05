import {GetProvidersDentalGuide} from 'domain/usecases';
import {RemoteGetProvidersDentalGuide} from 'data/usecases';
import {makeBFFApiUrl} from 'main/factories/http';
import {makeAuthorizeHttpClientDecorator} from 'main/factories/decorators';
import {guideFlowEndpoints} from '../../endpoints';

export const makeGetProvidersDentalGuide = (): GetProvidersDentalGuide =>
	new RemoteGetProvidersDentalGuide(
		makeBFFApiUrl(guideFlowEndpoints.odontoGuideProviders),
		makeAuthorizeHttpClientDecorator(),
	);
