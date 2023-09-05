export type PostMedicalRebookParams = {
	nuConsulta: string;
	cdEspecialidade: string;
	cdPrestadorFisico: string;
	cdPrestadorJuridico: string;
	dtAgendamento: string;
	horarioAgendamento: string;
};

export type PostMedicalRebookModel = {
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
			enderecoCorrespondencia: number;
			pessoa: string;
		};
		local: {
			codigo: number;
			enderecoCorrespondencia: number;
			pessoa: string;
			filial: string;
		};
		data: string;
		nmPessoaRazaoSocial: string;
		cdSubEspecialidade: number;
		dtOperacao: string;
		dtStatus: string;
		cdOperador: string;
		nuProtocolo: string;
	};
};

export interface PostMedicalRebook {
	post: (params: PostMedicalRebookParams) => Promise<PostMedicalRebookModel>;
}
