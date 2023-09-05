import {Help} from 'domain/usecases';
import {RemoteHelp} from 'data/usecases';
import {makeHVApiUrl, makeAxiosHttpClient} from 'main/factories/http';

export const makeRemoteAuthentication = (): Help =>
	new RemoteHelp(makeHVApiUrl('/wsfaleconosco/faleconosco/salvaSAC'), makeAxiosHttpClient());
