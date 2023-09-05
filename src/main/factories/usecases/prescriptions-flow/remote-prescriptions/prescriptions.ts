import {GetPrescriptions} from 'domain/usecases/prescription-flow/prescripition';
import {RemoteGetPrescriptions} from 'data/usecases/prescription-flow/remote-prescripition';
import {makeBFFApiUrl} from 'main/factories/http';
import {makeAuthorizeHttpClientDecorator} from 'main/factories/decorators';
import {prescriptionFlowEndPoints} from '../../endpoints';

export const makeGetPrescriptions = (): GetPrescriptions =>
	new RemoteGetPrescriptions(
		makeBFFApiUrl(prescriptionFlowEndPoints.prescription),
		makeAuthorizeHttpClientDecorator(),
	);
