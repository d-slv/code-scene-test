import React from 'react';

type DoneIconProps = {
	width?: number;
	height?: number;
};

export const DoneIcon = ({width = 180, height = 180}: DoneIconProps) => (
	<svg
		width={width}
		height={height}
		viewBox="0 0 203 203"
		fill="none"
		xmlns="http://www.w3.org/2000/svg">
		<path
			d="M101.5 202.349C157.556 202.349 202.999 157.052 202.999 101.175C202.999 45.2975 157.556 0 101.5 0C45.4429 0 0 45.2975 0 101.175C0 157.052 45.4429 202.349 101.5 202.349Z"
			fill="#0054B8"
		/>
		<rect x="45.1611" y="41.0801" width="112.776" height="105.729" fill="url(#pattern0)" />
		<defs>
			<pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
				<use xlinkHref="#image0_9895_65316" transform="scale(0.015625 0.0166667)" />
			</pattern>
			<image
				id="image0_9895_65316"
				width="64"
				height="60"
				xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAAA8CAYAAADWibxkAAAAAXNSR0IArs4c6QAAA4NJREFUaAXlW12IDlEY9vlZf4kW+YnsRlwotbkgf+lTbpSSckFu18WSiNhysW0oivJbrlxRxIXkxo3cuBCSSC0XHy0JuxRF/j7PM5xp/nZmzpk9c8503nqac+Z733fe5/nmzHxzzny1ZrM5wpBNxHFPA0uBccBH4B3QB1wHHgLarWZQgK1gdymF4W18tgNopPgU/mhk4QzqCbKOvR6pnwBz1Q+RHZlVRHYGdY8POUInwSftLMmRIt3FpAC/00vzP12N1iy/N8wNkwK0SHBZKOEr5WpSgMkSlY6V8JVyNSnAbIlK8w4XiZT/XE0KMEO6Wg0BJgVo1cBHOqVJAdqlq9UQYEoA/vRdpoGPdEpTAixCpXwWMG6mBFhnnPn/AkwJsNllAeaB/AqXBdhlC3nWUfYQGI9j7nRZgB6QV/ld/0eXaGXOCE0BCU57jVIg04GYxwpxmSFlDoGbqEaFPElsymSi6FDWGXAc9e1XrFGE3UPjm+hIbt/A/y5wAxgIxXJSVDMOIL8t9hmF9AI+Z91nwFGo3R1S3I7OA5RRB77oEmAqkp8HtgC2Gi+qHUIATk/tBlYBQ10YeSviODoFfAWSrIadvM/3AFY876OONOuiANPh8QiYk+YZ+KyBNh9l3wf28d6+F+gE2oCq2H1eDC4CsnYWAeJCMhPtl7IJLPHv5+m+XOHrWhKIuYb2/EC/Ss0JFEBldVTM0vLJbmWVGEdq/UkBfkV25ukKATizU2UbGOqKn5fUj7yOlvodLiqAyvCxRYuDKORyUQFsISNbxxUEHGOQqwL0CsVcFeC76wKsdV0A/7eLq0OAzzIed1cFWAwBWjgMXBXgDrh7F0JXBejit09zUYAT4P3cY++gAK/AeZ8gz61rZ8CFIHkXBQivCTh4BsRezHBtCHCavj04DFwTgNy5ZuGbawLwDxnPfPZouCbAEXAOLbAWFaBofPDL0N1+iwOcix6kKIEqzQlyCixWb1EBGlFFLe4/TaptOAQYTEps4b7Q7U/URwFURKiJBNjy1ZcqmPf8Hy2U5MdEd+boB5MdyuFv2oUrWVeTiqAAvDrK2qdAQD/a2wJ9G5sbUFTsOcArFMvUaxSWqhkjlsfFdjv2DSrk0hnSh+R1QNQY24o3RDZCjT1AGzAaiL6YyDOFi6ivgZMA37ZKMr4V0gnUgQXANKBs47uIL4BbwBkgduvDPt/+AoUURmGFT94nAAAAAElFTkSuQmCC"
			/>
		</defs>
	</svg>
);
