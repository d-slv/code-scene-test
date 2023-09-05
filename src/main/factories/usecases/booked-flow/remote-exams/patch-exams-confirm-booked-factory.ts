import {PatchExamsConfirm} from 'domain/usecases';
import {RemotePatchExamsConfirm} from 'data/usecases';
import {makeBFFApiUrl} from 'main/factories/http';
import {makeAuthorizeHttpClientDecorator} from 'main/factories/decorators';
import {bookedFlowEndPoints} from '../../endpoints';

export const makePatchExamsConfirmBooked = (): PatchExamsConfirm =>
	new RemotePatchExamsConfirm(
		makeBFFApiUrl(bookedFlowEndPoints.examsBookedConfirm),
		makeAuthorizeHttpClientDecorator(),
	);
