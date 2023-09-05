export type GetMedicalClinicsParams = {
	specialty_code: string;
	state_code: string;
	city: string;
	telemedicine: string;
};

export type GetMedicalClinicsModel = {
	content: {
		networkType: {
			code: string;
			name: string;
		};
		units: {
			code: number;
			name: string;
			stateCode: string;
			city: string;
			addressNumber: number;
			addressName: string;
			addressComplement: string;
			district: string;
			phoneNumber: number;
			latitude: string;
			longitude: string;
			telemedicine: string;
		}[];
	};
};

export interface GetMedicalClinics {
	get: (params: GetMedicalClinicsParams) => Promise<GetMedicalClinicsModel>;
}
