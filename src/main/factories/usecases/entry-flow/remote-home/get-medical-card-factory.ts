import {GetMedicalCard} from 'domain/usecases';
import {RemoteGetMedicalCard} from 'data/usecases';
import {makeBFFApiUrl} from 'main/factories/http';
import {makeAuthorizeHttpClientDecorator} from 'main/factories/decorators';
import {entryFlowEndPoints} from '../../endpoints';

export const makeGetMedicalCard = (): GetMedicalCard =>
	new RemoteGetMedicalCard(
		makeBFFApiUrl(entryFlowEndPoints.medicalCard),
		makeAuthorizeHttpClientDecorator(),
	);
