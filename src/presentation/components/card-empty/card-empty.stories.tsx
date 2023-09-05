import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import {CardEmpty} from './card-empty';

export default {
	/* 👇 The title prop is optional.
	 * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
	 * to learn how to generate automatic titles
	 */
	title: 'Card empty',
	component: CardEmpty,
} as ComponentMeta<typeof CardEmpty>;

export const Default: ComponentStory<typeof CardEmpty> = () => (
	<CardEmpty>
		Essa área é utilizada para apresentar os pagamentos que estão em aberto.
		<br />
		Neste momento você não possui nenhum pagamento em aberto
	</CardEmpty>
);
