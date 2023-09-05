import {makeLocalStorageAdapter} from 'main/factories/cache';
import {PostBeneficiaryModel} from 'domain/usecases';

export const setCurrentAccountAdapter = (account: PostBeneficiaryModel): void => {
	makeLocalStorageAdapter().set('account', account);
};

export const getCurrentAccountAdapter = (): PostBeneficiaryModel =>
	makeLocalStorageAdapter().get('account');
