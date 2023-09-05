export interface RadioButtonProps {
	name?: string;
	value?: string;
	checked?: boolean;
	onClick?: () => void;
}

export interface UpdatePhonesProps {
	phones?: string[];
	isTelemedicine?: boolean;
	onConfirm?: () => void;
	onBack?: () => void;
}
