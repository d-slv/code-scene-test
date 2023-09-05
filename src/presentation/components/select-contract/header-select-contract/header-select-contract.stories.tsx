import {Story, Meta} from '@storybook/react/types-6-0';
import React from 'react';
import HeaderSelectContract from '.';

export default {
	title: 'Components/HeaderSelectContract',
	component: HeaderSelectContract,
} as Meta;

export const Default: Story = () => <HeaderSelectContract />;
