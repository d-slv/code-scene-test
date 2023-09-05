import React from 'react';
import {MdRefresh} from 'react-icons/md';

import {translations} from 'presentation/translations';
import {FailureToLoad} from '../failure-to-load';
import {ButtonFailure} from '../failure-to-load/styles';
import {Container, Wrapper} from './styles';
import {Footer, Header} from '../select-contract';

export function ErrorFallback({resetErrorBoundary}) {
	return (
		<>
			<Header />
			<Container>
				<Wrapper>
					<FailureToLoad />
					<ButtonFailure
						fontSize={'xxs'}
						variant="outlined"
						onClick={resetErrorBoundary}
						rightIcon={<MdRefresh />}>
						{translations['pt-br'].bookingFlow.buttonTryAgain}
					</ButtonFailure>
				</Wrapper>
			</Container>
			<Footer />
		</>
	);
}
