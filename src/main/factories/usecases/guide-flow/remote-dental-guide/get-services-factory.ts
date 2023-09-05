import {GetServicesDentalGuide} from 'domain/usecases';
import {RemoteGetServicesDentalGuide} from 'data/usecases';
import {makeBFFApiUrl} from 'main/factories/http';
import {makeAuthorizeHttpClientDecorator} from 'main/factories/decorators';
import {guideFlowEndpoints} from '../../endpoints';

export const makeGetServicesDentalGuide = (): GetServicesDentalGuide =>
	new RemoteGetServicesDentalGuide(
		makeBFFApiUrl(guideFlowEndpoints.odontoGuideServices),
		makeAuthorizeHttpClientDecorator(),
	);
