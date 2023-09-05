import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import {TabNavbar} from './tab-navbar';

export default {
	/* 👇 The title prop is optional.
	 * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
	 * to learn how to generate automatic titles
	 */
	title: 'TabNavbar',
	component: TabNavbar,
} as ComponentMeta<typeof TabNavbar>;

const args = {
	tabNames: ['Em aberto', 'Histórico', 'Imposto de renda'],
	callback: (tabIndex: number) => console.log(tabIndex),
};

export const Default: ComponentStory<typeof TabNavbar> = () => <TabNavbar {...args} />;
