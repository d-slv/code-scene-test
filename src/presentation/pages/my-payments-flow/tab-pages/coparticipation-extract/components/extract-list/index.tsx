import React from 'react';

import {CoparticipationExtract} from 'domain/usecases';

import {Container} from './styles';
import {ExtractItem} from '../extract-item';

interface ExtractListProps {
	extracts: CoparticipationExtract[];
}

export function ExtractList({extracts}: ExtractListProps) {
	return (
		<Container>
			{extracts.map((extract, index) => (
				<ExtractItem item={extract} key={index} />
			))}
		</Container>
	);
}
