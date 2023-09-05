import React from 'react';
import {Meta, Story} from '@storybook/react';
import {CardCategory} from '.';

export default {
	title: 'Components/Molecules/CardCategory',
	component: CardCategory,
} as Meta;

export const Default: Story = () => <CardCategory attributes={undefined} />;
