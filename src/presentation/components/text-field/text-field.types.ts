import {Dispatch, InputHTMLAttributes, SetStateAction} from 'react';

type spacingInsetType = 'quarck' | 'nano' | 'xs' | 'sm' | 'md' | 'lg';

export interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
	label?: string;
	invalidMessage?: string;
	isInvalid?: boolean;
	centralizedMessage?: boolean;
	fontSize?: 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'display';
	fontWeight?: 'bold' | 'medium' | 'regular';
	spacingInset?: spacingInsetType;
	spacingInsetX?: spacingInsetType;
	spacingInsetY?: spacingInsetType;
	spacingInsetRight?: spacingInsetType;
	spacingInsetLeft?: spacingInsetType;
	borderWidth?: 'none' | 'hairline' | 'thin' | 'thick' | 'heavy';
	borderRadius?: 'none' | 'nano' | 'md' | 'lg' | 'pill' | 'circular';
	setState?: Dispatch<SetStateAction<boolean>>;
}
