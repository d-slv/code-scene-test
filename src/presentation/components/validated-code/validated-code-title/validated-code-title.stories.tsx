import {Story, Meta} from '@storybook/react/types-6-0';
import React from 'react';
import ValidatedCodeTitle from '.';

export default {
	title: 'Components/ValidatedCodeTitle',
	component: ValidatedCodeTitle,
} as Meta;

export const Default: Story = () => <ValidatedCodeTitle />;
