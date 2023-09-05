import React from 'react';

type PlusCircleIconProps = {
	width?: number;
	height?: number;
};

export const PlusCircleIcon = ({width = 18, height = 18}: PlusCircleIconProps) => (
	<svg
		width={width}
		height={height}
		viewBox="0 0 18 18"
		fill="none"
		xmlns="http://www.w3.org/2000/svg">
		<g clipPath="url(#clip0_9684_58741)">
			<path
				d="M9 6V9M9 9V12M9 9H12M9 9H6"
				stroke="white"
				strokeWidth="2"
				strokeLinecap="round"
			/>
			<path
				d="M9 16.5C13.1421 16.5 16.5 13.1421 16.5 9C16.5 4.85786 13.1421 1.5 9 1.5C4.85786 1.5 1.5 4.85786 1.5 9C1.5 13.1421 4.85786 16.5 9 16.5Z"
				stroke="white"
				strokeWidth="2"
			/>
		</g>
		<defs>
			<clipPath id="clip0_9684_58741">
				<rect width="18" height="18" fill="white" />
			</clipPath>
		</defs>
	</svg>
);
