export type PostOdontoCancelParams = {
	nuConsulta: string;
	cdPontoEntrada: string;
};

export type PostOdontoCancelModel = {
	protocolo: string;
};

export interface PostOdontoCancel {
	post: (params: PostOdontoCancelParams) => Promise<PostOdontoCancelModel>;
}
