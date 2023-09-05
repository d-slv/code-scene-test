import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import {Table} from './table';

export default {
	title: 'Table',
	component: Table,
} as ComponentMeta<typeof Table>;

const args = {
	header: {
		columns: [{text: 'Realização'}, {text: 'Procedimento'}, {text: 'Participação'}],
	},
	body: {
		background: {stripe: true},
		rows: [
			[
				{text: '16/06/2021'},
				{text: 'Consulta (Somente horário)'},
				{text: 'R$ 50,24', color: 'primary'},
			],
			[
				{text: '16/06/2021'},
				{text: 'Consulta (Somente horário)'},
				{text: 'R$ 50,24', color: 'primary'},
			],
		],
	},
};

export const Default: ComponentStory<typeof Table> = () => <Table {...args} />;
