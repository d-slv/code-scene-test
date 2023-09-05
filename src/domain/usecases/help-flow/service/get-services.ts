import {ReactNode} from 'react';

export type GetServicesModel = {
	data: {
		id: number;
		attributes: {
			title: string;
			icon: ReactNode;
			resume: string;
			link: string;
			text: string;
			textButton: string;
		};
	}[];
};

export interface GetServices {
	getServices: () => Promise<GetServicesModel>;
}
