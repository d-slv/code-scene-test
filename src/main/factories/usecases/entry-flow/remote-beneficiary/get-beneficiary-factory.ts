import {GetBeneficiary} from 'domain/usecases';
import {RemoteGetBeneficiary} from 'data/usecases';
import {makeBFFApiUrl} from 'main/factories/http';
import {makeAuthorizeHttpClientDecorator} from 'main/factories/decorators';
import {entryFlowEndPoints} from '../../endpoints';

export const makeGetBeneficiary = (): GetBeneficiary =>
	new RemoteGetBeneficiary(
		makeBFFApiUrl(entryFlowEndPoints.beneficiaryList),
		makeAuthorizeHttpClientDecorator(),
	);
