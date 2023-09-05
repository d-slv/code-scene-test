import {GetProvidersDetailsMedicalGuide} from 'domain/usecases';
import {RemoteGetProvidersDetailsMedicalGuide} from 'data/usecases';
import {makeBFFApiUrl} from 'main/factories/http';
import {makeAuthorizeHttpClientDecorator} from 'main/factories/decorators';
import {guideFlowEndpoints} from '../../endpoints';

export const makeGetProvidersDetailsMedicalGuide = (): GetProvidersDetailsMedicalGuide =>
	new RemoteGetProvidersDetailsMedicalGuide(
		makeBFFApiUrl(guideFlowEndpoints.medicalGuideProvidersDetails),
		makeAuthorizeHttpClientDecorator(),
	);
