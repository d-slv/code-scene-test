export type HelpUpdateCellParams = {
	cdUsuario: string;
	cell: string;
	ddd: string;
};

export type HelpUpdateCellModel = unknown;

export interface HelpUpdateCell {
	helpUpdateCell: (params: HelpUpdateCellParams) => Promise<HelpUpdateCellModel>;
}
