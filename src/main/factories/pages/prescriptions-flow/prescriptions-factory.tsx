import React from 'react';
import {PrescriptionPage} from 'presentation/pages/prescription-flow/prescription';
import {
	makeGetPrescriptions,
	makeRemoteSpecialties,
	makeRemoteDownloadPDFPrescription,
} from 'main/factories/usecases';

export const MakePrescription: React.FC = () => (
	<PrescriptionPage
		prescriptions={makeGetPrescriptions()}
		specialties={makeRemoteSpecialties()}
		download={makeRemoteDownloadPDFPrescription()}
	/>
);
