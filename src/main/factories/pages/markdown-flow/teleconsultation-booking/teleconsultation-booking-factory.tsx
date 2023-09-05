import React from 'react';
import {
	makeGetTelehealthDates,
	makeGetTelehealthTimes,
	// makePostMedicalRebook,
	makePutMedicalRescheduleAppointment,
} from 'main/factories/usecases';
import {TeleconsultationMarkdown} from 'presentation/pages/rebooking-flow';

export const MakeTeleconsultationMarkdown: React.FC = () => (
	<TeleconsultationMarkdown
		date={makeGetTelehealthDates()}
		time={makeGetTelehealthTimes()}
		// rebooking={makePostMedicalRebook()}
		rebooking={makePutMedicalRescheduleAppointment()}
	/>
);
