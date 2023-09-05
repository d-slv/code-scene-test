import {GetNeighborhoodsDentalGuide} from 'domain/usecases';
import {RemoteGetNeighborhoodsDentalGuide} from 'data/usecases';
import {makeBFFApiUrl} from 'main/factories/http';
import {makeAuthorizeHttpClientDecorator} from 'main/factories/decorators';
import {guideFlowEndpoints} from '../../endpoints';

export const makeGetNeighborhoodsDentalGuide = (): GetNeighborhoodsDentalGuide =>
	new RemoteGetNeighborhoodsDentalGuide(
		makeBFFApiUrl(guideFlowEndpoints.odontoGuideNeighborhoods),
		makeAuthorizeHttpClientDecorator(),
	);
