import {Story, Meta} from '@storybook/react/types-6-0';
import React from 'react';
import LoginTitle from '.';

export default {
	title: 'Components/LoginTitle',
	component: LoginTitle,
} as Meta;

export const Default: Story = () => <LoginTitle />;
