import React, {ReactNode, useState} from 'react';
import {LogoCarteirinha} from '../icons/logo-carteirinha';
import {Modal} from '../modal';
import * as S from './medical-card.style';

type ModalSliderProps = {
	modalData: {
		title: string;
		subtitle?: string;
		content: ReactNode;
	}[];
	closeCallback: () => void;
};

export function MedicalCardSlider(props: ModalSliderProps) {
	const {modalData, closeCallback} = props;

	const [currentIndex, setCurrentIndex] = useState<number>(0);

	return (
		<Modal variant="other" isOpen={true} onClose={closeCallback}>
			<S.Header>
				<S.ContentLogo>
					<LogoCarteirinha />
				</S.ContentLogo>
				<S.NavigationButton>
					{currentIndex > 0 && (
						<span onClick={() => setCurrentIndex(currentIndex - 1)}>
							<S.LeftArrowButton />
						</span>
					)}
				</S.NavigationButton>

				{modalData[currentIndex].subtitle && (
					<S.Subtitle>{modalData[currentIndex].subtitle}</S.Subtitle>
				)}
				<S.Title>{modalData[currentIndex].title}</S.Title>

				<S.NavigationButton>
					{currentIndex < modalData.length - 1 && (
						<span onClick={() => setCurrentIndex(currentIndex + 1)}>
							<S.RightArrowButton />
						</span>
					)}
				</S.NavigationButton>
			</S.Header>

			<S.ContentBody>{modalData[currentIndex].content}</S.ContentBody>

			<S.Footer>
				{modalData.map((_, index) => (
					<S.NavigationIndicator key={index} isSelected={currentIndex === index} />
				))}
			</S.Footer>
		</Modal>
	);
}
