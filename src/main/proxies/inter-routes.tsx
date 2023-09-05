import {Navigate, Outlet} from 'react-router-dom';
import {useRecoilState, useRecoilValue} from 'recoil';
import React from 'react';

import {makeLocalStorageAdapter} from 'main/factories/cache';
import {accountDataState} from 'presentation/pages/entry-flow/atoms';

export const PlanRoute = () => {
	const [accountData, setAccountData] = useRecoilState(accountDataState);

	if (accountData?.login_token && accountData?.access_token) {
		setAccountData({login_token: accountData.login_token});
		return <Outlet />;
	}

	if (accountData?.login_token) {
		return <Outlet />;
	}

	return <Navigate to="/login" />;
};

export const BeneficiariesRoute = () => {
	const accountData = useRecoilValue(accountDataState);
	const storedAccountData = makeLocalStorageAdapter().get('account');

	if (!accountData?.login_token) {
		return <Navigate to="/login" replace />;
	}

	if (!accountData?.beneficiary?.nmPlano) {
		return <Navigate to="/plano" />;
	}

	if (storedAccountData?.access_token) {
		makeLocalStorageAdapter().set('account', {
			login_token: accountData.login_token,
			beneficiary: accountData.beneficiary,
		});
	}

	return <Outlet />;
};
