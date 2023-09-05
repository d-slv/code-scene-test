import {Story, Meta} from '@storybook/react/types-6-0';
import React from 'react';
import BackgroundImage from '.';

export default {
	title: 'Components/BackgroundImage',
	component: BackgroundImage,
} as Meta;

export const Default: Story = () => <BackgroundImage />;
