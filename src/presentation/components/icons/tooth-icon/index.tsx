import React from 'react';

type IconProps = {
	width: number;
	height: number;
	color?: string;
	weight?: string;
};

export const ToothIcon = ({width, height, color = '#0054B8', weight = '3'}: IconProps) => (
	<svg
		width={width}
		height={height}
		viewBox="0 0 32 31"
		fill="none"
		xmlns="http://www.w3.org/2000/svg">
		<path
			d="M9.22298 1.5C5.09898 1.5 2.34998 5.624 2.34998 9.748C2.34998 12.648 3.72498 16.621 5.09898 17.996C6.47298 19.371 7.84798 28.996 10.599 28.996C16.84 28.996 13.348 19.374 16.099 19.374C18.85 19.374 15.357 28.996 21.599 28.996C24.348 28.996 25.723 19.374 27.099 17.996C28.475 16.618 29.848 12.649 29.848 9.748C29.842 5.624 27.093 1.5 22.969 1.5C18.845 1.5 18.85 2.875 16.096 2.875C13.342 2.875 13.35 1.5 9.22298 1.5Z"
			stroke={color}
			strokeWidth={weight}
		/>
	</svg>
);
