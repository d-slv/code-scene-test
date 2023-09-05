import React from 'react';

type IconProps = {
	width: number;
	height: number;
	fill: string;
};

export const DownloadIcon = ({width, height, fill}: IconProps) => (
	<svg
		width={width}
		height={height}
		viewBox="0 0 32 24"
		fill="none"
		xmlns="http://www.w3.org/2000/svg">
		<path
			d="M5.71289 20.3822H19.388V18.4999H5.71289V20.3822ZM19.388 10.0292H15.4805V4.3822H9.6198V10.0292H5.71289L12.5501 16.6176L19.388 10.0292Z"
			fill={fill}
		/>
	</svg>
);
