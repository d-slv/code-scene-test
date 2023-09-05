import React from 'react';
import {MedicalBooking} from 'presentation/pages/booking-flow';
import {
	makeGetMedicalDates,
	makeGetMedicalSpecialists,
	makeGetMedicalCities,
	makeGetMedicalStates,
	makePostMedicalCreateAppointment,
	makeGetMedicalClinics,
	makeGetMedicalAppointments,
	makeGetMedicalSpecialties,
	makePutMedicalRescheduleAppointment,
	makeGetBeneficiaryContacts,
} from 'main/factories/usecases';

export const MakeMedicalBooking: React.FC = () => (
	<MedicalBooking
		contacts={makeGetBeneficiaryContacts()}
		date={makeGetMedicalDates()}
		time={makeGetMedicalSpecialists()}
		states={makeGetMedicalStates()}
		cities={makeGetMedicalCities()}
		confirm={makePostMedicalCreateAppointment()}
		providers={makeGetMedicalClinics()}
		specialties={makeGetMedicalSpecialties()}
		booked={makeGetMedicalAppointments()}
		rebooking={makePutMedicalRescheduleAppointment()}
	/>
);
