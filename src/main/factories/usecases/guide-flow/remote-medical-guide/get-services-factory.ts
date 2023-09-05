import {GetServicesMedicalGuide} from 'domain/usecases';
import {RemoteGetServicesMedicalGuide} from 'data/usecases';
import {makeBFFApiUrl} from 'main/factories/http';
import {makeAuthorizeHttpClientDecorator} from 'main/factories/decorators';
import {guideFlowEndpoints} from '../../endpoints';

export const makeGetServicesMedicalGuide = (): GetServicesMedicalGuide =>
	new RemoteGetServicesMedicalGuide(
		makeBFFApiUrl(guideFlowEndpoints.medicalGuideServices),
		makeAuthorizeHttpClientDecorator(),
	);
