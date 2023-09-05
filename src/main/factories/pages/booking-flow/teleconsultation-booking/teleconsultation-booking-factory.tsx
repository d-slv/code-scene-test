import React from 'react';
import {
	// makeGetMedicalBooked,
	// makePostMedicalRebook,
	makeGetMedicalAppointments,
	makePutMedicalRescheduleAppointment,
	makeGetTelehealthDates,
	makeGetTelehealthTimes,
	makePostTelehealthBooking,
	makeGetTelehealthProviders,
	makeGetTelehealthSpecialties,
	makeGetBeneficiaryContacts,
	makeGetMedicalExternalUrl,
} from 'main/factories/usecases';
import {TeleconsultationBooking} from 'presentation/pages/booking-flow';

export const MakeTeleconsultationBooking: React.FC = () => (
	<TeleconsultationBooking
		date={makeGetTelehealthDates()}
		time={makeGetTelehealthTimes()}
		// booked={makeGetMedicalBooked()}
		// rebook={makePostMedicalRebook()}
		booked={makeGetMedicalAppointments()}
		rebook={makePutMedicalRescheduleAppointment()}
		book={makePostTelehealthBooking()}
		providers={makeGetTelehealthProviders()}
		specialties={makeGetTelehealthSpecialties()}
		contacts={makeGetBeneficiaryContacts()}
		externalUrl={makeGetMedicalExternalUrl()}
	/>
);
