import React from 'react';

type LineProps = {
	width: number;
	height: number;
};

export const Line = ({width = 1, height = 61}: LineProps) => (
	<svg
		width={width}
		height={height}
		viewBox="0 0 1 61"
		fill="none"
		xmlns="http://www.w3.org/2000/svg">
		<line x1="0.5" y1="61" x2="0.499997" y2="2.18557e-08" stroke="#E7E7E7" />
	</svg>
);
