import {ReactNode} from 'react';

export interface SelectDropDownFieldProps {
	onChange: (value: string) => void;
	options: (string | number)[];
	initialValue?: string | number;
}

export interface SelectFieldProps {
	onChange?: (value: string) => void;
	placeholder?: string;
	value?: string;
	children: ReactNode;
	disabled?: boolean;
	size?: 'sm' | 'lg';
	fullWidth?: boolean;
}
