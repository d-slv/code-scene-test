export type PostOdontoRebookParams = {
	dtConsulta: string;
	nuConsulta: string;
	cdPontoEntrada: string;
	cdEspecialidade: string;
	horarioConsulta: string;
	cdPrestadorFisico: string;
	cdSubEspecialidade: string;
	cdPrestadorJuridico: string;
};

export type PostOdontoRebookModel = {
	reagendamento: {
		numero: number;
		especialidade: {
			codigo: number;
			descricao: string;
			diasRetornoConsulta: number;
			quantidadeDiasAns: number;
			odontologia: string;
		};
		usuario: {
			codigo: string;
			nuUsuario: string;
			pessoa: string;
			usuarioTitular: string;
		};
		status: number;
		medico: {
			codigo: number;
			enderecoCorrespondencia: string;
			pessoa: string;
		};
		local: {
			codigo: number;
			enderecoCorrespondencia: string;
			pessoa: string;
			filial: string;
		};
		data: string;
		nmPessoaRazaoSocial: string;
		cdSubEspecialidade: string;
		dtOperacao: string;
		dtStatus: null;
		cdOperador: string;
		nuProtocolo: string;
		cdOperadorStatus: string;
		protocoloCancelamento: string;
		nuTelefones: string[];
		dsRecomendacoes: string[];
	};
};

export interface PostOdontoRebook {
	post: (params: PostOdontoRebookParams) => Promise<PostOdontoRebookModel>;
}
