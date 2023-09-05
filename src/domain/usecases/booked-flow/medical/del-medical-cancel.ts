export type PostMedicalCancelParams = {
	number: string;
};

export type PostMedicalCancelModel = {
	detail: {
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
			cancelProtocol: string;
			protocol: string;
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
			createdAt: string;
			id: string;
		};
		timestamp: string;
		traceId: string;
		notifications: unknown[];
	};
};

export interface PostMedicalCancel {
	post: (params: PostMedicalCancelParams) => Promise<PostMedicalCancelModel>;
}
