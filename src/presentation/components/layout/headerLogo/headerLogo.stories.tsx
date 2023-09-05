import {Story, Meta} from '@storybook/react/types-6-0';
import React from 'react';
import HeaderLogo from '.';

export default {
	title: 'Components/HeaderLogo',
	component: HeaderLogo,
} as Meta;

export const Default: Story = () => <HeaderLogo />;
