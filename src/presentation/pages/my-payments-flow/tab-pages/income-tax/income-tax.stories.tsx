import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import {IncomeTaxComponent} from './income-tax-component';

export default {
	/* 👇 The title prop is optional.
	 * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
	 * to learn how to generate automatic titles
	 */
	title: 'COMPONENTS/My Payments/IncomeTax',
	component: IncomeTaxComponent,
} as ComponentMeta<typeof IncomeTaxComponent>;

const incomeTaxDetails = {
	cdUsuario: '0010000001',
	dsEnderecoFontePagadora: 'R DOUTOR RIBAMAR LOBO 430',
	dsFonteRecebedora: 'HAPVIDA ASSISTÊNCIA MÉDICA LTDA',
	dsSituacaoUsuario: 'ATIVO',
	dtEmissao: '24/10/2022',
	nuCnpjFonteRecebedora: '63.554.067/0001-98',
	nuValorTotalPago: 'string',
	listaValoresPorBeneficiarios: [
		{
			nmBeneficiario: 'string',
			dsTipoBeneficiario: 'string',
			nuVlNominalBeneficiario: 'string',
			nuVlNominalBeneficiarioFormatado: 'string',
		},
	],
};

const args = {
	incomeTaxDetails,
	pdf: {get: _a => Promise.resolve(new Blob())},
	dtExercicio: '2019',
};

export const Default: ComponentStory<typeof IncomeTaxComponent> = () => (
	<IncomeTaxComponent {...args} />
);
