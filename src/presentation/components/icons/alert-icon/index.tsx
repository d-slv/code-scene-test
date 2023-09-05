import React from 'react';

type AlertIconProps = {
	width: number;
	height: number;
	color?: string;
};

export const AlertIcon = ({width, height, color = '#0054B8'}: AlertIconProps) => (
	<svg
		width={width}
		height={height}
		viewBox="0 0 86 100"
		fill="none"
		xmlns="http://www.w3.org/2000/svg">
		<path
			d="M49.7769 35.4473V59.3369M49.7769 76.0596V78.4485"
			stroke={color}
			strokeWidth="3"
			strokeLinecap="round"
		/>
		<path
			d="M3.10629 83.3022L41.8934 7.02756C45.3001 0.324146 54.2682 0.324146 57.6701 7.02756L96.4524 83.3022C99.7062
		89.7237 95.3774 97.5595 88.5545 97.5595H10.9946C4.17654 97.5595 -0.157027 89.7237 3.11107 83.3022H3.10629Z"
			stroke={color}
			strokeWidth="3"
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
	</svg>
);
