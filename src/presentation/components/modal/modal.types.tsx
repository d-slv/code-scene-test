import {ReactNode, CSSProperties} from 'react';

export interface ModalProps {
	title?: string;
	isOpen?: boolean;
	onClose: () => void;
	children: ReactNode;
	hideTitle?: boolean;
	leftTitle?: boolean;
	style?: CSSProperties;
	showOverlay?: boolean;
	containerStyle?: CSSProperties;
	titleStyle?: React.CSSProperties;
	variant?: 'default' | 'guide' | 'other';
	customCloseBtnBgColor?: string;
}
