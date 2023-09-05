import React from 'react';
import {useRecoilValue} from 'recoil';
import {Navigate, Outlet} from 'react-router-dom';

import {accountDataState} from 'presentation/pages/entry-flow/atoms';

const PublicRoutes = () => {
	const currentAccount = useRecoilValue(accountDataState);

	if (currentAccount?.login_token && currentAccount?.access_token) {
		return <Navigate to="/home" replace />;
	}

	if (currentAccount?.login_token) {
		return <Navigate to="/plano" replace />;
	}

	return <Outlet />;
};

export default PublicRoutes;
