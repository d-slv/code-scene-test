import {PatchMedicalConfirm} from 'domain/usecases';
import {RemotePatchMedicalConfirm} from 'data/usecases';
import {makeBFFApiUrl} from 'main/factories/http';
import {makeAuthorizeHttpClientDecorator} from 'main/factories/decorators';
import {bookedFlowEndPoints} from '../../endpoints';

export const makePatchMedicalConfirmBooked = (): PatchMedicalConfirm =>
	new RemotePatchMedicalConfirm(
		makeBFFApiUrl(bookedFlowEndPoints.medicalBookedConfirm),
		makeAuthorizeHttpClientDecorator(),
	);
