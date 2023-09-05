import React from 'react';
import {MessageSuccessForgotPassword} from './message-success-forgot-password';

export default {
	title: 'COMPONENTS/MessageSuccess',
	component: MessageSuccessForgotPassword,
	argTypes: {},
};

const Template = args => (
	<MessageSuccessForgotPassword {...args}>
		Nova senha registrada com sucesso
	</MessageSuccessForgotPassword>
);

export const Default = Template.bind({});
