import React from 'react';
import {SuccessIcon} from '../icons/success-icon';
import {Container, Text} from './message-success-signup.styles';

export const MessageSuccessSignUp = () => (
	<Container>
		<SuccessIcon width={64} height={64} />
		<Text>Cadastro Realizado com sucesso</Text>
	</Container>
);
