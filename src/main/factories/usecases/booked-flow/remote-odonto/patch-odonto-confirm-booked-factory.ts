import {PatchOdontoConfirm} from 'domain/usecases';
import {RemotePatchOdontoConfirm} from 'data/usecases';
import {makeBFFApiUrl} from 'main/factories/http';
import {makeAuthorizeHttpClientDecorator} from 'main/factories/decorators';
import {bookedFlowEndPoints} from '../../endpoints';

export const makePatchOdontoConfirmBooked = (): PatchOdontoConfirm =>
	new RemotePatchOdontoConfirm(
		makeBFFApiUrl(bookedFlowEndPoints.odontoBookedConfirm),
		makeAuthorizeHttpClientDecorator(),
	);
