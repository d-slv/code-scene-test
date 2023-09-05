import {Story, Meta} from '@storybook/react/types-6-0';
import React from 'react';
import InfoCard from '.';

export default {
	title: 'Components/InfoCard',
	component: InfoCard,
} as Meta;

export const Default: Story = () => <InfoCard />;
