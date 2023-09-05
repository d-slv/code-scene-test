import {HelpVerifyCellCapture} from 'domain/usecases';
import {RemoteHelpVerifyCellCapture} from 'data/usecases';
import {makeHVApiUrl, makeAxiosHttpClient} from 'main/factories/http';

export const makeRemoteAuthentication = (): HelpVerifyCellCapture =>
	new RemoteHelpVerifyCellCapture(
		makeHVApiUrl('/wsfaleconosco/faleconosco/verificaCelCaptura'),
		makeAxiosHttpClient(),
	);
