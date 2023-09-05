import {GetSpecialties} from 'domain/usecases/prescription-flow/specialties';
import {RemoteGetSpecialties} from 'data/usecases/prescription-flow/remote-specialties';
import {makeAuthorizeHttpClientDecorator} from 'main/factories/decorators';
import {makeBFFApiUrl} from 'main/factories/http';
import {prescriptionFlowEndPoints} from '../../endpoints';

export const makeRemoteSpecialties = (): GetSpecialties =>
	new RemoteGetSpecialties(
		makeBFFApiUrl(prescriptionFlowEndPoints.specialties),
		makeAuthorizeHttpClientDecorator(),
	);
