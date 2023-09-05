import React from 'react';

type HouseIconProps = {
	width: number;
	height: number;
	color?: string;
};

export const HouseIcon = ({width, height, color = '#0054B8'}: HouseIconProps) => (
	<svg
		width={width}
		height={height}
		viewBox="0 0 21 16"
		fill="none"
		xmlns="http://www.w3.org/2000/svg">
		<path
			d="M8.5931 15.9547V10.3313H12.447V15.9538H17.2642V8.45771H20.1549L10.5196 0.0234375L0.885254 8.45771H3.77594V15.9547H8.5931Z"
			fill={color}
		/>
	</svg>
);
