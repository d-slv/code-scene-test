export type OperationalCostPasswordParams = {
	cdEmpresa: string;
	nuSenha: string;
};

export type OperationalCostPasswordModel = unknown;

export interface PostOperationalCostPassword {
	post: (params: OperationalCostPasswordParams) => Promise<OperationalCostPasswordModel>;
}
