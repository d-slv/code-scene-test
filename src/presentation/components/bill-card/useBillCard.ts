/* eslint-disable no-console */
/* eslint-disable no-alert */
import {useState} from 'react';
import {translations} from 'presentation/translations';
import {GetObligationPdf} from 'domain/usecases';

const useBillCard = () => {
	const [wasCopyButtonPressed, setWasCopyButtonPressed] = useState<boolean>(false);
	const [isDownloadLoading, setIsDownloadLoading] = useState<boolean>(false);

	const copyBarCode = (barCode: string) => {
		if (wasCopyButtonPressed) return;

		const onlyNumberPattern = /\d+/g;
		navigator.clipboard.writeText(barCode.match(onlyNumberPattern).join(''));
		setWasCopyButtonPressed(true);

		setTimeout(() => {
			setWasCopyButtonPressed(false);
		}, 2000);
	};

	function downloadBill(pdf: GetObligationPdf, cdObrigacao: number) {
		setIsDownloadLoading(true);
		if (!isDownloadLoading) {
			pdf.get({obrigacao: cdObrigacao})
				.then(response => {
					window.open(URL.createObjectURL(response));
				})
				.catch(error => {
					console.log('MyPaments Error:', error);
					window.alert(translations['pt-br'].myPaymentsPage.downloadError);
					setIsDownloadLoading(false);
				})
				.finally(() => setIsDownloadLoading(false));
		}
	}

	return {
		wasCopyButtonPressed,
		setWasCopyButtonPressed,
		isDownloadLoading,
		setIsDownloadLoading,
		copyBarCode,
		downloadBill,
	};
};

export default useBillCard;
