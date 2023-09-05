import React from 'react';

import {ModalProps} from '.';
import {Header, Content, Wrapper, ModalTitle, ModalButtonClose, Body} from './modal.styles';

export const Modal: React.FC<ModalProps> = ({
	children,
	isOpen,
	title = '',
	hideTitle = false,
	onClose,
	showOverlay = true,
	style,
	leftTitle = false,
	variant = 'default',
	customCloseBtnBgColor,
	titleStyle,
}) => {
	function verifyOpen() {
		if (isOpen) {
			return 'overlay';
		}
		return 'none';
	}

	return (
		<Content>
			<Wrapper className={`modal ${isOpen ? 'active' : 'none'}`} id="modal" style={style}>
				<Header showTitle={hideTitle}>
					<ModalTitle style={titleStyle} leftTitle={leftTitle}>
						{title}
					</ModalTitle>
					<ModalButtonClose
						customBgColor={customCloseBtnBgColor}
						onClick={() => onClose()}>
						&times;
					</ModalButtonClose>
				</Header>
				<Body variant={variant}>{children}</Body>
			</Wrapper>
			{showOverlay && variant === 'default' ? (
				<div
					id={verifyOpen()}
					onClick={() => onClose()}
					style={{opacity: isOpen ? 1 : 0}}></div>
			) : (
				<div id={verifyOpen()} style={{opacity: isOpen ? 1 : 0}}></div>
			)}
		</Content>
	);
};
