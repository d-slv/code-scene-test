import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import styled from 'styled-components';
import {PasswordField, TextField, TokenField} from '.';

const Container = styled.div`
	width: 500px;
	background-color: ${props => props.theme.colors.white};
	padding: 2rem;
`;

export default {
	title: 'COMPONENTS/Atoms/Text Field',
	component: TextField,
} as ComponentMeta<typeof TextField>;

export const Input: ComponentStory<typeof TextField> = () => (
	<Container>
		<TextField label="Label" />
	</Container>
);
export const PasswordInput: ComponentStory<typeof PasswordField> = () => (
	<Container>
		<PasswordField label="Password:" type="password" />
	</Container>
);
export const InvalidInput: ComponentStory<typeof TextField> = () => (
	<Container>
		<TextField label="Label:" isInvalid invalidMessage="Message error!" />
	</Container>
);
export const TokenInput: ComponentStory<typeof TextField> = () => (
	<Container>
		<TokenField label="Label:" />{' '}
	</Container>
);
