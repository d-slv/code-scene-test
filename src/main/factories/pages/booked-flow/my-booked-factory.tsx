import React from 'react';
import {MyAppointments} from 'presentation/pages/my-appointments-flow';
import {
	makePostOdontoCancelBooked,
	makePostMedicalCancelBooked,
	makePatchOdontoConfirmBooked,
	makePatchMedicalConfirmBooked,
} from 'main/factories/usecases';

export const MakeMyAppointments: React.FC = () => (
	<MyAppointments
		cancelAppointmentOdonto={makePostOdontoCancelBooked()}
		cancelAppointmentMedical={makePostMedicalCancelBooked()}
		confirmAppointmentOdonto={makePatchOdontoConfirmBooked()}
		confirmAppointmentMedical={makePatchMedicalConfirmBooked()}
	/>
);
