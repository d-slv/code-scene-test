import React from 'react';
import {GrCircleAlert} from 'react-icons/gr';
import {EmptyCardGuide} from './guide-styles';

export const emptyCardRender = (condition: boolean) => {
	if (condition) {
		return (
			<EmptyCardGuide>
				<GrCircleAlert />
				Não localizamos resultados para sua pesquisa!
			</EmptyCardGuide>
		);
	}
	return (
		<EmptyCardGuide>
			Preencha os campos acima para pesquisar na rede de atendimento do seu plano.
		</EmptyCardGuide>
	);
};
