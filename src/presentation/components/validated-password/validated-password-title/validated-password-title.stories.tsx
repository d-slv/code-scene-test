import {Story, Meta} from '@storybook/react/types-6-0';
import React from 'react';
import ValidatedPasswordTitle from '.';

export default {
	title: 'Components/ValidatedPasswordTitle',
	component: ValidatedPasswordTitle,
} as Meta;

export const Default: Story = () => <ValidatedPasswordTitle />;
