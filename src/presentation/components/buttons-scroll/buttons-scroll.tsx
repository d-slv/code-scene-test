import React, {useState} from 'react';
import {MdChevronLeft, MdChevronRight} from 'react-icons/md';
import * as S from './styles';

interface ReferenceProps {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	reference: React.MutableRefObject<any>;
}

const ButtonsScroll: React.FC<ReferenceProps> = ({children, reference}) => {
	const [leftButton, setLeftButton] = useState(true);
	const [rightButton, setRightButton] = useState(true);

	const sideScroll = (element: HTMLDivElement, speed: number, distance: number, step: number) => {
		const maxScrollLeft = element.scrollWidth - element.clientWidth;
		const exactScrollLeft = element.scrollWidth === element.clientWidth;

		let scrollAmount = 0;

		const slideTimer = setInterval(() => {
			// eslint-disable-next-line no-param-reassign
			element.scrollLeft += step;
			scrollAmount += Math.abs(step);
			if (scrollAmount >= distance) {
				clearInterval(slideTimer);
			}
			if (element.scrollLeft === 0) {
				setLeftButton(false);
			}
			if (element.scrollLeft >= maxScrollLeft || exactScrollLeft) {
				setRightButton(false);
			}
		}, speed);
	};

	return (
		<S.Content>
			<S.ButtonScroll
				disabled={!leftButton}
				onClick={() => {
					sideScroll(reference.current, 25, 100, -10);
					setRightButton(true);
				}}>
				<S.Icon>
					<MdChevronLeft />
				</S.Icon>
			</S.ButtonScroll>

			<S.IndicatorBar disabled={!rightButton}></S.IndicatorBar>

			<S.ButtonScroll
				disabled={!rightButton}
				onClick={() => {
					sideScroll(reference.current, 25, 100, 10);
					setLeftButton(true);
				}}>
				<S.Icon>
					<MdChevronRight />
				</S.Icon>
			</S.ButtonScroll>
			{children}
		</S.Content>
	);
};

export default ButtonsScroll;
