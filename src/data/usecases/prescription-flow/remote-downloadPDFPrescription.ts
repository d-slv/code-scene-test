import {HttpClient, HttpStatusCode} from 'data/protocols/http';
import * as DownloadPDFPrescription from 'domain/usecases/prescription-flow/downloadPDFPrescription';
import {InvalidCredentialsError, UnknowError} from 'data/errors';

export class RemoteDownloadPDFPrescription
	implements DownloadPDFPrescription.DownloadPDFPrescription
{
	constructor(
		private readonly url: string,
		private readonly httpClient: HttpClient<DownloadPDFPrescription.DownloadPDFPrescriptionModel>,
	) {}

	async downloadPDFPrescription(): Promise<DownloadPDFPrescription.DownloadPDFPrescriptionModel> {
		const httpResponse = await this.httpClient.request({
			url: this.url,
			method: 'get',
			responseType: 'blob',
		});

		switch (httpResponse.statusCode) {
			case HttpStatusCode.ok:
				return httpResponse.body;
			case HttpStatusCode.unauthorized:
				throw new InvalidCredentialsError(httpResponse);
			default:
				throw new UnknowError(httpResponse);
		}
	}
}
