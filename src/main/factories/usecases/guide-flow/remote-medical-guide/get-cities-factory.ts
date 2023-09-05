import {GetCitiesMedicalGuide} from 'domain/usecases';
import {RemoteGetCitiesMedicalGuide} from 'data/usecases';
import {makeBFFApiUrl} from 'main/factories/http';
import {makeAuthorizeHttpClientDecorator} from 'main/factories/decorators';
import {guideFlowEndpoints} from '../../endpoints';

export const makeGetCitiesMedicalGuide = (): GetCitiesMedicalGuide =>
	new RemoteGetCitiesMedicalGuide(
		makeBFFApiUrl(guideFlowEndpoints.medicalGuideCities),
		makeAuthorizeHttpClientDecorator(),
	);
