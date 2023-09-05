import React from 'react';

type NextArrowProps = {
	width?: number;
	height?: number;
};

export const NextArrowIcon = ({width = 31, height = 40}: NextArrowProps) => (
	<svg
		width={width}
		height={height}
		viewBox="0 0 31 49"
		fill="none"
		xmlns="http://www.w3.org/2000/svg">
		<path
			d="M4.52429 44.1719L24.5243 24.1719L4.5243 4.17187"
			stroke="#0054B8"
			strokeWidth="8"
			strokeLinecap="round"
		/>
	</svg>
);
