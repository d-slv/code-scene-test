import {GetSpecialtiesSubSpecialtiesMedicalGuide} from 'domain/usecases';
import {RemoteGetSpecialtiesSubSpecialtiesMedicalGuide} from 'data/usecases';
import {makeBFFApiUrl} from 'main/factories/http';
import {makeAuthorizeHttpClientDecorator} from 'main/factories/decorators';
import {guideFlowEndpoints} from '../../endpoints';

export const makeGetSpecialtiesSubSpecialtiesMedicalGuide =
	(): GetSpecialtiesSubSpecialtiesMedicalGuide =>
		new RemoteGetSpecialtiesSubSpecialtiesMedicalGuide(
			makeBFFApiUrl(guideFlowEndpoints.medicalGuideSpecialties),
			makeAuthorizeHttpClientDecorator(),
		);
