import {Story, Meta} from '@storybook/react/types-6-0';
import React from 'react';
import LoginFooter from '.';

export default {
	title: 'Components/LoginForm',
	component: LoginFooter,
} as Meta;

export const Default: Story = () => <LoginFooter />;
