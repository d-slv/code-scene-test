import React from 'react';

type BackArrowProps = {
	width?: number;
	height?: number;
};

export const BackArrowIcon = ({width = 31, height = 40}: BackArrowProps) => (
	<svg
		width={width}
		height={height}
		viewBox="0 0 31 49"
		fill="none"
		xmlns="http://www.w3.org/2000/svg">
		<path
			d="M26.1833 4.17188L6.18335 24.1719L26.1833 44.1719"
			stroke="#0054B8"
			strokeWidth="8"
			strokeLinecap="round"
		/>
	</svg>
);
