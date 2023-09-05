/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
import React, {ReactElement, ReactNode, useEffect, useRef, useState} from 'react';
import useWindowDimensions from 'presentation/hooks/useWindowDimensions';
import {IoIosArrowForward} from 'react-icons/io';
import * as S from './styles';

type SliderProps = {
	step: number;
	spaceBetween?: number;
	useArrows?: boolean;
	children: ReactNode[];
	responsiveThreshold?: number;
};

type isDisabledProps = {
	left: boolean;
	right: boolean;
};

const isReactFragment = (variableToInspect: any) => {
	if (variableToInspect.type) {
		return variableToInspect.type === React.Fragment;
	}
	return variableToInspect === React.Fragment;
};

const Slider = ({
	step,
	spaceBetween,
	useArrows = true,
	children,
	responsiveThreshold = 640,
}: SliderProps) => {
	const ScrollRef = useRef(null);
	const [isDisabled, setIsDisabled] = useState<isDisabledProps>({
		left: true,
		right: true,
	});

	const {width} = useWindowDimensions();
	const isResponsive = width < responsiveThreshold;

	const shouldDisable = async (useAwait = true) => {
		const scrollElem = ScrollRef.current as HTMLElement;

		// Sleep Function
		// eslint-disable-next-line no-promise-executor-return
		if (useAwait) await new Promise(r => setTimeout(r, 400));

		setIsDisabled({
			left: scrollElem.scrollLeft === 0,
			right:
				Math.floor(scrollElem.scrollWidth - scrollElem.scrollLeft) <=
				scrollElem.offsetWidth,
		});
	};

	useEffect(() => {
		shouldDisable();
	}, [width]);

	const moveScroll = (direction: 'left' | 'right') => {
		const scrollElem = ScrollRef.current as HTMLElement;

		switch (direction) {
			case 'left':
				scrollElem.scrollTo(scrollElem.scrollLeft - step, 0);
				break;
			case 'right':
				scrollElem.scrollTo(scrollElem.scrollLeft + step, 0);
				break;
			default:
				break;
		}

		shouldDisable();
	};

	return (
		<S.Container spaceBeside={useArrows} isResponsive={isResponsive}>
			{!isResponsive && useArrows && (
				<>
					<S.ArrowButton
						disabled={isDisabled.left}
						direction="left"
						onClick={() => moveScroll('left')}>
						<IoIosArrowForward size={20} />
					</S.ArrowButton>

					<S.ArrowButton
						disabled={isDisabled.right}
						direction="right"
						onClick={() => moveScroll('right')}>
						<IoIosArrowForward size={20} />
					</S.ArrowButton>
				</>
			)}

			<S.Scroll isResponsive={isResponsive} ref={ScrollRef}>
				{children.map((node, index) => {
					if (!node) {
						return null;
					}

					if (Array.isArray(node)) {
						if (node.length > 0)
							return node.map((childNode, childIndex) => (
								<S.SliderBlock
									key={`array${childIndex}`}
									spaceBetween={childIndex < node.length && spaceBetween}>
									{childNode}
								</S.SliderBlock>
							));
					} else if (isReactFragment(node)) {
						return (node as ReactElement).props.children.map(
							(childNode, childIndex) => (
								<S.SliderBlock
									key={`frag${childIndex}`}
									spaceBetween={
										childIndex <
											(node as ReactElement).props.children.length - 1 &&
										spaceBetween
									}>
									{childNode}
								</S.SliderBlock>
							),
						);
					} else {
						return (
							<S.SliderBlock
								key={index}
								spaceBetween={index < children.length - 1 && spaceBetween}>
								{node}
							</S.SliderBlock>
						);
					}
				})}
			</S.Scroll>
		</S.Container>
	);
};

export default Slider;
