import React from 'react';

import {ButtonsFailure, FailureToLoad} from 'presentation/components/failure-to-load';
import {Container} from './styles';

export function LoadingError() {
	return (
		<Container>
			<FailureToLoad />
			<ButtonsFailure />
		</Container>
	);
}
