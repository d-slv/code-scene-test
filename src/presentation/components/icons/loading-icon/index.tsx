import React from 'react';

type LoadingIconProps = {
	width?: string;
	height?: string;
	marginAuto?: boolean;
};

export const LoadingIcon = ({
	width = '40px',
	height = '40px',
	marginAuto = true,
}: LoadingIconProps) => (
	<svg
		style={{
			margin: marginAuto ? 'auto' : 0,
			background: 'none',
			display: 'block',
			shapeRendering: 'auto',
		}}
		width={width}
		height={height}
		viewBox="0 0 100 100"
		preserveAspectRatio="xMidYMid">
		<circle
			cx="50"
			cy="50"
			r="40"
			strokeWidth="10"
			stroke="#0054B8"
			strokeDasharray="62.83185307179586 62.83185307179586"
			fill="none"
			strokeLinecap="round">
			<animateTransform
				attributeName="transform"
				type="rotate"
				repeatCount="indefinite"
				dur="2.5s"
				keyTimes="0;1"
				values="0 50 50;360 50 50"
			/>
		</circle>
	</svg>
);
