import {Dispatch, SetStateAction, MutableRefObject} from 'react';
import {handleDownloadImage} from 'presentation/utils/downloadImage';

// Função para verificar consultas agendadas e passar dados e ações para o subfluxo

export interface FilteredResult {
	nmDoctor: string;
	dtConsulta: string;
	nuConsulta: string;
	dsSpecialty: string;
	cdAppointment: number;
	cdSpecialty: string;
	cdSubSpecialty: string;
}

export function verifyAppointment(
	value: string,
	setState: Dispatch<SetStateAction<any>>,
	list: FilteredResult[],
	setModal: Dispatch<SetStateAction<boolean>>,
) {
	const o = list?.reduce((s, a) => {
		if (a.cdSpecialty === value) {
			// eslint-disable-next-line no-param-reassign
			s = a;
		}
		return s;
	}, {});
	setState(o);
	setModal(true);
}

export const printAppointment = (actRef: MutableRefObject<HTMLElement>) => {
	setTimeout(() => {
		handleDownloadImage(actRef);
	}, 0.1);
};
