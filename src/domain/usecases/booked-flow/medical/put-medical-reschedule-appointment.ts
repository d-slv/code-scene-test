export type PutMedicalRescheduleAppointmentParams = {
	number: string;
	date: string;
	providerCode: string;
	clinicCode: string;
	specialtyCode: string;
	subSpecialtyCode?: string;
};

export type PutMedicalRescheduleAppointmentModel = unknown;

export interface PutMedicalRescheduleAppointment {
	put: (
		params: PutMedicalRescheduleAppointmentParams,
	) => Promise<PutMedicalRescheduleAppointmentModel>;
}
