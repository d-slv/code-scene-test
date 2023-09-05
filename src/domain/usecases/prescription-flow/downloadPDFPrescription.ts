export type DownloadPDFPrescriptionModel = Blob;

export interface DownloadPDFPrescription {
	downloadPDFPrescription: () => Promise<DownloadPDFPrescriptionModel>;
}
