import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import {StethoscopeIcon} from 'presentation/components/icons';
import {HomeCard} from './home-card';

export default {
	/* 👇 The title prop is optional.
	 * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
	 * to learn how to generate automatic titles
	 */
	title: 'HomeCard',
	component: HomeCard,
} as ComponentMeta<typeof HomeCard>;

const args = {
	title: 'Consulta | 27/10/2022',
	content: 'CLINICO GERAL às 10h00 em PA BEZERRA DE MENEZE',
	rightIcon: <StethoscopeIcon width={80} height={109} contained={false} />,
};

export const Default: ComponentStory<typeof HomeCard> = () => <HomeCard {...args} />;
