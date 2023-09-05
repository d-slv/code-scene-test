import React from 'react';

import {BaseText, BoldText} from './data-line.styles';

type DataLineProps = {
	title: string;
	value: string;
};

const DataLine = ({title, value}: DataLineProps) => (
	<BaseText>
		<BoldText>{`${title.toUpperCase()}:`}</BoldText>&nbsp;
		{(value || 'Não consta').toUpperCase()}
	</BaseText>
);

export default DataLine;
