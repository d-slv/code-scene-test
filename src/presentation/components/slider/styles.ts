import styled from 'styled-components';

type StatusProps = {
	isResponsive: boolean;
	spaceBeside?: boolean;
};

type ArrowButtonProps = {
	direction: 'right' | 'left';
};

type SliderBlockProps = {
	spaceBetween: number;
};

export const Container = styled.div<StatusProps>`
	padding: 0px ${props => (props.isResponsive || !props.spaceBeside ? '0px' : '22px')};
	margin: 0px ${props => (props.isResponsive || !props.spaceBeside ? '0px' : '-22px')};
	width: calc(100% + ${props => (props.isResponsive || !props.spaceBeside ? '0px' : '22px')});
	position: relative;
`;

export const Scroll = styled.div<StatusProps>`
	width: 100%;
	padding-bottom: 16px;
	display: inline-flex;
	overflow-x: ${props => (props.isResponsive ? 'scroll' : 'hidden')};
	scroll-behavior: smooth;

	::-webkit-scrollbar {
		width: 0px;
		height: 0px;
	}
`;

export const SliderBlock = styled.div<SliderBlockProps>`
	margin-right: ${props => `${props.spaceBetween || 0}px`};
`;

export const ArrowButton = styled.button<ArrowButtonProps>`
	height: 34px;
	width: 34px;
	border: 1px solid white;
	box-sizing: content-box;
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 100%;
	background-color: #0054b8;
	padding: 0px;
	cursor: pointer;
	position: absolute;
	top: 50%;
	translate: 0px -50%;
	rotate: ${props => props.direction === 'left' && '180deg'};
	left: ${props => props.direction === 'left' && '0px'};
	right: ${props => props.direction === 'right' && '0px'};
	z-index: 2;
	color: white;

	&:disabled {
		background-color: #acb5bd;
		opacity: 1;
	}

	&:active {
		opacity: 0.9;
	}
`;
