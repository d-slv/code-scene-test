export type PatchMedicalConfirmParams = {
	nuConsulta: string;
	flagConfirmado: string;
};

export interface PatchMedicalConfirm {
	patch: (params: PatchMedicalConfirmParams) => Promise<unknown>;
}
