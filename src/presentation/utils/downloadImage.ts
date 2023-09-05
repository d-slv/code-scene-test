import amplitude from 'amplitude-js';
import html2canvas from 'html2canvas';
import {MutableRefObject} from 'react';
import TagManager from 'react-gtm-module';

export const handleDownloadImage = async (ref: MutableRefObject<HTMLElement>) => {
	const element = ref.current;
	const canvas = await html2canvas(element);

	const data = canvas.toDataURL('image/png');
	const link = document.createElement('a');

	if (typeof link.download === 'string') {
		link.href = data;
		link.download = 'comprovante-hapvida.png';

		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);

		const tagManagerArgs = {
			gtmId: 'GTM-KQKN552',
			events: {
				sendUserInfo: 'Baixou comprovante',
			},
		};

		TagManager.initialize(tagManagerArgs);
		amplitude.getInstance().logEvent('Baixou comprovante');
	} else {
		window.open(data);
	}
};
