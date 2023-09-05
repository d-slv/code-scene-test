export type PatchMedicalConfirmParams = {
	number: string;
	confirmationFlag: string;
};

export type PatchMedicalConfirmModel = {
	detail: {
		content: {
			number: string;
			date: string;
			provider: {
				code: string;
				name: string;
			};
			clinic: {
				code: string;
				name: string;
			};
			status: string;
			type: string;
			isFitting: false;
			isCancelled: false;
			isReturn: false;
			cancelDate: string;
			cancelReason: string;
			cancelProtocol: string;
			protocol: string;
			member: {
				code: string;
				name: string;
				number: string;
			};
			forwardGuide: string;
			specialty: {
				code: string;
				description: string;
			};
			operationDate: string;
			statusDate: string;
			operatorCode: string;
			operatorStatus: string;
			operatorConfirmationCode: string;
			confirmationDate: string;
			confirmationType: string;
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

export interface PatchMedicalConfirm {
	patch: (params: PatchMedicalConfirmParams) => Promise<PatchMedicalConfirmModel>;
}
