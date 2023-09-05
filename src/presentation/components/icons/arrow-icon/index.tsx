import React from 'react';

type ArrowIconProps = {
	width: number;
	height: number;
};

export const ArrowIcon = ({width, height}: ArrowIconProps) => (
	<svg
		width={width}
		height={height}
		viewBox="0 0 16 16"
		fill="none"
		xmlns="http://www.w3.org/2000/svg">
		<path
			fillRule="evenodd"
			clipRule="evenodd"
			d="M15.834 6.927H3.761L9.3 1.385L7.917 0L0 7.917L7.917 15.834L9.3 14.449L3.761 
			8.907H15.834V6.927Z"
			fill="white"
		/>
	</svg>
);
