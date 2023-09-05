import {GetChatRoom} from 'domain/usecases';
import {RemoteGetChatRoom} from 'data/usecases';
import {makeBFFApiUrl} from 'main/factories/http';
import {makeAuthorizeHttpClientDecorator} from 'main/factories/decorators';
import {externalLinkPoint} from '../../endpoints';

export const makeGetChatRoom = (): GetChatRoom =>
	new RemoteGetChatRoom(
		makeBFFApiUrl(externalLinkPoint.chatRoom),
		makeAuthorizeHttpClientDecorator(),
	);
