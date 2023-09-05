import React from 'react';
import {MedicalBooking} from 'presentation/pages/booking-flow';
import {
	makeGetMedicalDates,
	makeGetMedicalTimes,
	makeGetMedicalCities,
	makeGetMedicalStates,
	makePostMedicalBookingConfirm,
	makeGetMedicalProviders,
	makeGetMedicalBooked,
	makeGetMedicalSpecialties,
	makePostMedicalRebook,
	makeGetBeneficiaryContacts,
} from 'main/factories/usecases';

export const MakeMedicalBooking: React.FC = () => (
	<MedicalBooking
		contacts={makeGetBeneficiaryContacts()}
		date={makeGetMedicalDates()}
		time={makeGetMedicalTimes()}
		states={makeGetMedicalStates()}
		cities={makeGetMedicalCities()}
		confirm={makePostMedicalBookingConfirm()}
		providers={makeGetMedicalProviders()}
		specialties={makeGetMedicalSpecialties()}
		booked={makeGetMedicalBooked()}
		rebooking={makePostMedicalRebook()}
	/>
);
