export type PostOdontoBookingConfirmParams = {
	dtConsulta: string;
	cdPontoEntrada: string;
	horarioConsulta: string;
	cdEspecialidade: string;
	cdPrestadorFisico: string;
	cdSubEspecialidade: string;
	cdPrestadorJuridico: string;
};

export type PostOdontoBookingConfirmModel = {
	nuTelefones: [];
	dsRecomentacoes: [];
	consultaMarcada: {
		numero: string;
		especialidade: {
			codigo: string;
			descricao: string;
			diasRetornoConsulta: string;
			quantidadeDiasAns: string;
			odontologia: string;
		};
		usuario: {
			codigo: string;
			nuUsuario: string;
			pessoa: string;
			usuarioTitular: string;
		};
		status: string;
		medico: {
			codigo: string;
			enderecoCorrespondencia: string;
			pessoa: string;
		};
		local: {
			codigo: string;
			enderecoCorrespondencia: string;
			pessoa: string;
			filial: string;
		};
		data: string;
		nmPessoaRazaoSocial: string;
		cdSubEspecialidade: string;
		dtOperacao: string;
		dtStatus: string;
		cdOperador: string;
		nuProtocolo: string;
		cdTipoConfirmacao: string;
		cdOperadorConfirma: string;
		dtConfirmacao: string;
		cdOperadorStatus: string;
	};
};

export interface PostOdontoBookingConfirm {
	post: (params: PostOdontoBookingConfirmParams) => Promise<PostOdontoBookingConfirmModel>;
}
