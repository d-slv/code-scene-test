import React from 'react';
import {useRecoilValue} from 'recoil';
import {Navigate, Outlet} from 'react-router-dom';
import {ErrorBoundary} from 'react-error-boundary';

import {PrivateRouteWrapper} from 'presentation/components/private-route-wrapper';
import {ErrorFallback} from 'presentation/components/error-fallback';
import {accountDataState} from 'presentation/pages/entry-flow/atoms';

const PrivateRoutes = () => {
	const currentAccount = useRecoilValue(accountDataState);

	if (currentAccount?.login_token && currentAccount?.access_token) {
		return (
			<ErrorBoundary
				FallbackComponent={ErrorFallback}
				onReset={() => window.location.reload()}>
				<PrivateRouteWrapper>
					<Outlet />
				</PrivateRouteWrapper>
			</ErrorBoundary>
		);
	}

	if (currentAccount?.login_token) {
		return <Navigate to="/plano" replace />;
	}

	return <Navigate to="/login" replace />;
};

export default PrivateRoutes;
