export type GetMedicalAppointmentsParams = {
	limit?: number;
	status?: number;
};

export type GetMedicalAppointmentsModel = {
	content: [
		{
			id: string;
			number: number;
			date: string;
			provider: {
				code: string;
				name: string;
			};
			clinic: {
				code: string;
			};
			status: number;
			type: string;
			isFitting: boolean;
			isCancelled: boolean;
			isReturn: boolean;
			member: {
				code: string;
				number: string;
			};
			specialty: {
				code: string;
				description: string;
			};
			subSpecialtyCode: string;
			operationDate: string;
			statusDate: string;
			appointmentReturnDays: string;
			cellPhoneNumber: string;
			createdAt: string;
		},
	];
};

export interface GetMedicalAppointments {
	get: (params?: GetMedicalAppointmentsParams) => Promise<GetMedicalAppointmentsModel>;
}
