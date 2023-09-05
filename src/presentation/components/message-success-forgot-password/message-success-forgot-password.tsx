import React from 'react';
import {SuccessIcon} from '../icons/success-icon';
import {Container, Text} from './message-success-forgot-password.styles';

export const MessageSuccessForgotPassword = () => (
	<Container>
		<SuccessIcon width={64} height={64} />
		<Text>Nova senha registrada com sucesso</Text>
	</Container>
);
