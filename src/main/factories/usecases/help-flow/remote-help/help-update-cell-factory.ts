import {HelpUpdateCell} from 'domain/usecases';
import {RemoteHelpUpdateCell} from 'data/usecases';
import {makeHVApiUrl, makeAxiosHttpClient} from 'main/factories/http';

export const makeRemoteAuthentication = (): HelpUpdateCell =>
	new RemoteHelpUpdateCell(
		makeHVApiUrl('/wsfaleconosco/faleconosco/atualizaCelular'),
		makeAxiosHttpClient(),
	);
