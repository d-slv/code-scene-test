import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import {HistoryCardDesktop} from './history-card-desktop';

export default {
	/* 👇 The title prop is optional.
	 * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
	 * to learn how to generate automatic titles
	 */
	title: 'COMPONENTS/My Payments/HistoryCardDesktop',
	component: HistoryCardDesktop,
} as ComponentMeta<typeof HistoryCardDesktop>;

const args = {
	mes: 'Abril/2019',
	dtPagamento: '05/05/2019',
	vlObrigacao: '1510.00',
	dtVencimento: '06/06/2019',
};

export const Default: ComponentStory<typeof HistoryCardDesktop> = () => (
	<HistoryCardDesktop {...args} />
);
