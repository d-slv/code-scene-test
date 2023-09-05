import {ButtonHTMLAttributes, ReactNode} from 'react';

type breakPoints = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
type spacingInsetType = 'quarck' | 'nano' | 'xs' | 'sm' | 'md' | 'lg';

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
	[key in breakPoints]?: {
		fontSize?: 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'display';
		fontWeight?: 'bold' | 'medium' | 'regular';
		spacingInset?: spacingInsetType;
		spacingInsetX?: spacingInsetType;
		spacingInsetY?: spacingInsetType;
		borderWidth?: 'none' | 'hairline' | 'thin' | 'thick' | 'heavy';
		borderRadius?: 'none' | 'md' | 'lg' | 'pill' | 'circular';
		rightIcon?: ReactNode;
		leftIcon?: ReactNode;
		variant?: 'contained' | 'outlined';
		transition?: true | false;
		color?:
			| 'primary'
			| 'secondary'
			| 'success'
			| 'warning'
			| 'white'
			| 'danger'
			| 'orange.400'
			| 'SecondaryBlue.500';
		fullWidth?: boolean;
	};
} & {
	children: ReactNode;
	fontSize?: 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'display';
	fontWeight?: 'bold' | 'medium' | 'regular';
	spacingInset?: spacingInsetType;
	spacingInsetX?: spacingInsetType;
	spacingInsetY?: spacingInsetType;
	borderWidth?: 'none' | 'hairline' | 'thin' | 'thick' | 'heavy';
	borderRadius?: 'none' | 'md' | 'lg' | 'pill' | 'circular';
	rightIcon?: ReactNode;
	leftIcon?: ReactNode;
	variant?: 'contained' | 'outlined';
	transition?: true | false;
	color?:
		| 'primary'
		| 'secondary'
		| 'success'
		| 'warning'
		| 'danger'
		| 'white'
		| 'orange.400'
		| 'SecondaryBlue.500';
	fullWidth?: boolean;
	isLoading?: boolean;
};
