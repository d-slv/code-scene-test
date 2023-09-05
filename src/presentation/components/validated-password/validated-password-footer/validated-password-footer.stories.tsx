import {Story, Meta} from '@storybook/react/types-6-0';
import React from 'react';
import ValidatedPasswordFooter from '.';

export default {
	title: 'Components/ValidatedPasswordFooter',
	component: ValidatedPasswordFooter,
} as Meta;

export const Default: Story = () => <ValidatedPasswordFooter />;
