import {Story, Meta} from '@storybook/react/types-6-0';
import React from 'react';
import ValidatedCodeFooter from '.';

export default {
	title: 'Components/ValidatedCodeFooter',
	component: ValidatedCodeFooter,
} as Meta;

export const Default: Story = () => <ValidatedCodeFooter />;
