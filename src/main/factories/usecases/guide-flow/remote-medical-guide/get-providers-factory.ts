import {GetProvidersMedicalGuide} from 'domain/usecases';
import {RemoteGetProvidersMedicalGuide} from 'data/usecases';
import {makeBFFApiUrl} from 'main/factories/http';
import {makeAuthorizeHttpClientDecorator} from 'main/factories/decorators';
import {guideFlowEndpoints} from '../../endpoints';

export const makeGetProvidersMedicalGuide = (): GetProvidersMedicalGuide =>
	new RemoteGetProvidersMedicalGuide(
		makeBFFApiUrl(guideFlowEndpoints.medicalGuideProviders),
		makeAuthorizeHttpClientDecorator(),
	);
