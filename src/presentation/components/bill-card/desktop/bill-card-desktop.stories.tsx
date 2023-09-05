import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import {BillCardDesktop} from './bill-card-desktop';

export default {
	/* 👇 The title prop is optional.
	 * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
	 * to learn how to generate automatic titles
	 */
	title: 'COMPONENTS/My Payments/BillCardDesktop',
	component: BillCardDesktop,
} as ComponentMeta<typeof BillCardDesktop>;

const bill = {
	dtPrevista: '05/06/2022',
	cdObrigacao: 1197213670,
	status: 'Em Negociação',
	linhaDigitavel: {
		dsSiteBanco:
			'https://www.santander.com.br/portal/wps/script/boleto_online_conv/ReemissaoBoleto.do?estado=comeco',
		cdBarra: '03399.82167 96710.101666 72347.101015 1 90070000030981',
		vlObrigacao: '309.81',
		qtDiasBaixa: 59,
		dtVencimento: '05/06/2022',
		dtAtual: '27/10/2022',
		qtDiasAtraso: 144,
		dsMensagemAtraso: 'Atenção! Juros e multa serão aplicados no ato do pagamento.',
	},
};

const args = {
	pdf: {get: _a => Promise.resolve(new Blob())},
	bill,
};

export const Default: ComponentStory<typeof BillCardDesktop> = () => <BillCardDesktop {...args} />;
