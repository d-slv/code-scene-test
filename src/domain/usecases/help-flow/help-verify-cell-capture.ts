export type HelpVerifyCellCaptureParams = {
	cdUsuario: string;
};

export type HelpVerifyCellCaptureModel = unknown;

export interface HelpVerifyCellCapture {
	helpVerifyCellCapture: (
		params: HelpVerifyCellCaptureParams,
	) => Promise<HelpVerifyCellCaptureModel>;
}
