export type PostMedicalCancelParams = {
	nuConsulta: string;
	cdPontoEntrada: string;
};

export type PostMedicalCancelModel = {
	protocolo: string;
};

export interface PostMedicalCancel {
	post: (params: PostMedicalCancelParams) => Promise<PostMedicalCancelModel>;
}
