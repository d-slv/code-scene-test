import React from 'react';
import {makePostOdontoCancelBooked, makePostMedicalCancelBooked} from 'main/factories/usecases';
import {MyAppointmentsDetail} from 'presentation/pages/my-appointments-flow/my-appointments-detail';

export const MakeMyAppointmentsDetail: React.FC = () => (
	<MyAppointmentsDetail
		cancelAppointmentOdonto={makePostOdontoCancelBooked()}
		cancelAppointmentMedical={makePostMedicalCancelBooked()}
	/>
);
