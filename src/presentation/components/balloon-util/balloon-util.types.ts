import {ReactNode} from 'react';
import {colors} from 'src/presentation/styles/styled';

export interface BalloonUtilTypes {
	children?: ReactNode;
	color?: colors;
	variant?: 'outlined';
}
