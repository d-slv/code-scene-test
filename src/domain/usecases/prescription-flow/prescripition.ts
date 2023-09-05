export type GetPrescriptionsParams = {
	date: string;
	specialty_slug: string;
	page: number;
	practitioner: string;
	source: string;
};

export type GetPrescriptionsModel = {
	pagination: {
		next: string;
		previous: string;
	};
	detail: string;
	total: number;
	data: {
		id: string;
		user_id: string;
		source: string;
		attendance_date: string;
		prescription_date: string;
		file_path: string;

		type: {
			id: string;
			name: string;
		};
		specialty: {
			id: number;
			name: string;
			slug: string;
		};
		signed: null;
		patient: {
			id: string;
			name: string;
		};
		practitioner: {
			id: string;
			name: string;
		};
		raw_prescription: string;
		items: [
			{
				id: string;
				type: string;
				name: string;
				quantity: string;
				unit: string;
				dosage: string;
				manufacturer: string;
				br_rx_form: {
					code: string;
					display: string;
				};
				eans: [];
			},
		];
	}[];
};

export interface GetPrescriptions {
	get: (params: GetPrescriptionsParams) => Promise<GetPrescriptionsModel>;
}
