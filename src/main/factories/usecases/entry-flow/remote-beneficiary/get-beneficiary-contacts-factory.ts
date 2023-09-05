import {GetBeneficiaryContacts} from 'domain/usecases';
import {RemoteGetBeneficiaryContacts} from 'data/usecases';
import {makeBFFApiUrl} from 'main/factories/http';
import {makeAuthorizeHttpClientDecorator} from 'main/factories/decorators';
import {entryFlowEndPoints} from '../../endpoints';

export const makeGetBeneficiaryContacts = (): GetBeneficiaryContacts =>
	new RemoteGetBeneficiaryContacts(
		makeBFFApiUrl(entryFlowEndPoints.beneficiaryContacts),
		makeAuthorizeHttpClientDecorator(),
	);
