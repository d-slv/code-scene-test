import {GetStatesMedicalGuide} from 'domain/usecases';
import {RemoteGetStatesMedicalGuide} from 'data/usecases';
import {makeBFFApiUrl} from 'main/factories/http';
import {makeAuthorizeHttpClientDecorator} from 'main/factories/decorators';
import {guideFlowEndpoints} from '../../endpoints';

export const makeGetStatesMedicalGuide = (): GetStatesMedicalGuide =>
	new RemoteGetStatesMedicalGuide(
		makeBFFApiUrl(guideFlowEndpoints.medicalGuideStates),
		makeAuthorizeHttpClientDecorator(),
	);
