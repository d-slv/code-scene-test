import {Story, Meta} from '@storybook/react/types-6-0';
import React from 'react';
import SignUpTitle from '.';

export default {
	title: 'Components/signUpTitle',
	component: SignUpTitle,
} as Meta;

export const Default: Story = () => <SignUpTitle />;
