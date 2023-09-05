import {GetProvidersDetailsDentalGuide} from 'domain/usecases';
import {RemoteGetProvidersDetailsDentalGuide} from 'data/usecases';
import {makeBFFApiUrl} from 'main/factories/http';
import {makeAuthorizeHttpClientDecorator} from 'main/factories/decorators';
import {guideFlowEndpoints} from '../../endpoints';

export const makeGetProvidersDetailsDentalGuide = (): GetProvidersDetailsDentalGuide =>
	new RemoteGetProvidersDetailsDentalGuide(
		makeBFFApiUrl(guideFlowEndpoints.odontoGuideProvidersDetails),
		makeAuthorizeHttpClientDecorator(),
	);
