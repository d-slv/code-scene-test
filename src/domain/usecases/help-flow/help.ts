export type HelpParams = {
	assunto: string;
	carteira: string;
	celular: string;
	comentario: string;
	email: string;
	empresa: string;
};

export type HelpModel = unknown;

export interface Help {
	auth: (params: HelpParams) => Promise<HelpModel>;
}
