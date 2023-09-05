import React from 'react';
import {MessageSuccessSignUp} from './message-success-signup';

export default {
	title: 'COMPONENTS/MessageSuccess',
	component: MessageSuccessSignUp,
	argTypes: {},
};

const Template = args => (
	<MessageSuccessSignUp {...args}>Cadastro realizado com sucesso</MessageSuccessSignUp>
);

export const Default = Template.bind({});
