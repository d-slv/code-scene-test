export type PostMedicalCreateAppointmentParams = {
	number: string;
	date: string;
	providerCode: string;
	clinicCode: string;
	specialtyCode: string;
	subSpecialtyCode?: string;
};

export type PostMedicalCreateAppointmentModel = {
	detail: {
		content: {
			content: {
				number: string;
				date: string;
				provider: {
					code: string;
				};
				clinic: {
					code: string;
				};
				status: string;
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
				};
				subSpecialtyCode: string;
				operationDate: string;
				statusDate: string;
				appointmentReturnDays: string;
				cellPhoneNumber: string;
				channelType: string;
				createdAt: string;
				id: string;
			};
			timestamp: string;
			traceId: string;
			notifications: unknown[];
		};
		timestamp: string;
		traceId: string;
		notifications: unknown[];
	};
};

export interface PostMedicalCreateAppointment {
	post: (
		params: PostMedicalCreateAppointmentParams,
	) => Promise<PostMedicalCreateAppointmentModel>;
}
