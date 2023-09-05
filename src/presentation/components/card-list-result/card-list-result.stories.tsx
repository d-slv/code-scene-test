import React from 'react';
import {Story} from '@storybook/react';
import {CardListResult} from '.';

export default {
	title: 'Components/CardListResult',
	component: CardListResult,
};

export const Default: Story = () => (
	<>
		<CardListResult></CardListResult>
	</>
);
