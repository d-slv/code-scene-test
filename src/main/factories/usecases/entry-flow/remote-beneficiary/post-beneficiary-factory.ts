import {PostBeneficiary} from 'domain/usecases';
import {RemotePostBeneficiary} from 'data/usecases';
import {makeBFFApiUrl} from 'main/factories/http';
import {makeAuthorizeHttpClientDecorator} from 'main/factories/decorators';
import {entryFlowEndPoints} from '../../endpoints';

export const makePostBeneficiary = (): PostBeneficiary =>
	new RemotePostBeneficiary(
		makeBFFApiUrl(entryFlowEndPoints.beneficiarySelection),
		makeAuthorizeHttpClientDecorator(),
	);
