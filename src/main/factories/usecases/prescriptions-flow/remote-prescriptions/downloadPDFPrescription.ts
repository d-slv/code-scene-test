import {RemoteDownloadPDFPrescription} from 'data/usecases/prescription-flow/remote-downloadPDFPrescription';
import {makeAxiosHttpClient} from 'main/factories/http';
import {useRecoilValue} from 'recoil';
import {DownloadPDFPrescription} from 'domain/usecases';
import {downloadPDFPrescription} from 'presentation/pages/states/atoms';

export const makeRemoteDownloadPDFPrescription = (): DownloadPDFPrescription => {
	const urlDownloadPDF = useRecoilValue(downloadPDFPrescription);
	return new RemoteDownloadPDFPrescription(urlDownloadPDF, makeAxiosHttpClient());
};
