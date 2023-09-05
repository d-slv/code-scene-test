import React from 'react';

type SharedIconProps = {
	width?: number;
	height?: number;
	color?: string;
};

export const SharedIcon = ({width = 25, height = 25, color = '#0054B8'}: SharedIconProps) => (
	<svg
		width={width}
		height={height}
		viewBox="0 0 25 25"
		fill="none"
		xmlns="http://www.w3.org/2000/svg">
		<path
			d="M16.6736 5.48242L15.2536 6.90242L13.6636 5.31242V16.4824H11.6836V5.31242L10.0936 6.90242L8.67358 5.48242L12.6736 1.48242L16.6736 5.48242ZM20.6736 10.4824V21.4824C20.6736 22.5824 19.7736 23.4824 18.6736 23.4824H6.67358C5.56358 23.4824 4.67358 22.5824 4.67358 21.4824V10.4824C4.67358 9.37242 5.56358 8.48242 6.67358 8.48242H9.67358V10.4824H6.67358V21.4824H18.6736V10.4824H15.6736V8.48242H18.6736C19.7736 8.48242 20.6736 9.37242 20.6736 10.4824Z"
			fill={color}
		/>
	</svg>
);
