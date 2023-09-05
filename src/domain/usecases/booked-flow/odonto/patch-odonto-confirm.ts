export type PatchOdontoConfirmParams = {
	nuConsulta: string;
	flagConfirmado: string;
};

export interface PatchOdontoConfirm {
	patch: (params: PatchOdontoConfirmParams) => Promise<unknown>;
}
