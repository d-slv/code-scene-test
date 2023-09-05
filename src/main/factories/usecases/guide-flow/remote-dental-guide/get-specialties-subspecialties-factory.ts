import {GetSpecialtiesSubSpecialtiesDentalGuide} from 'domain/usecases';
import {RemoteGetSpecialtiesSubSpecialtiesDentalGuide} from 'data/usecases';
import {makeBFFApiUrl} from 'main/factories/http';
import {makeAuthorizeHttpClientDecorator} from 'main/factories/decorators';
import {guideFlowEndpoints} from '../../endpoints';

export const makeGetSpecialtiesSubSpecialtiesDentalGuide =
	(): GetSpecialtiesSubSpecialtiesDentalGuide =>
		new RemoteGetSpecialtiesSubSpecialtiesDentalGuide(
			makeBFFApiUrl(guideFlowEndpoints.odontoGuideSpecialties),
			makeAuthorizeHttpClientDecorator(),
		);
