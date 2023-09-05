export type PostExamsCancelParams = {
	nuExame: string;
	cdPontoEntrada: string;
};

export type PostExamsCancelModel = {
	nuProtocolo: string;
};

export interface PostExamsCancel {
	post: (params: PostExamsCancelParams) => Promise<PostExamsCancelModel>;
}
