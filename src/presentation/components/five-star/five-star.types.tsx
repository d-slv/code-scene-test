import {PostFiveStars} from 'domain/usecases';
import {ReactNode, Dispatch, SetStateAction} from 'react';

export interface ButtonCheckBoxProps {
	resume?: string;
	isChecked?: boolean;
	isDisable?: boolean;
	children: ReactNode;
	onChange?: (value: object) => void;
	onSelectedItem?: (data: unknown) => void;
}

export type OptionsQuestions = {
	tipo: string;
	email: string;
	cdatendimento: string;
	qtdrespmotivadores: string;
	info: {titulo: string; especialidade: string};
	perguntas: {id: string; titulo: string; descricao: string};
	motivadores: {id: number; titulo: string; descricao: string}[];
}[];

export interface FiveStarProps {
	showModal: boolean;
	answers: PostFiveStars;
	questions: OptionsQuestions;
	setHideCard: Dispatch<SetStateAction<boolean>>;
	setShowModal: Dispatch<SetStateAction<boolean>>;
}
