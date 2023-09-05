import React from 'react';
import {MedicalMarkdown} from 'presentation/pages/rebooking-flow';
import {
	makeGetMedicalDates,
	makeGetMedicalSpecialists,
	makeGetMedicalClinics,
	makePutMedicalRescheduleAppointment,
} from 'main/factories/usecases';

export const MakeMedicalMarkdown: React.FC = () => (
	<MedicalMarkdown
		providers={makeGetMedicalClinics()}
		date={makeGetMedicalDates()}
		time={makeGetMedicalSpecialists()}
		rebooking={makePutMedicalRescheduleAppointment()}
	/>
);
