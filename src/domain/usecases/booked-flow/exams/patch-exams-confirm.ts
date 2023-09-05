export type PatchExamsConfirmParams = {
	nuExame: string;
	cdPontoEntrada: string;
	flConfirmado: string;
};

export interface PatchExamsConfirm {
	patch: (params: PatchExamsConfirmParams) => Promise<unknown>;
}
