import React from 'react';
import {translations} from '../../translations';
import {Container} from './card-empty.styles';

interface CardEmptyProps {
	title?: string;
}

export const CardEmpty: React.FC<CardEmptyProps> = ({children, title}) => (
	<Container>
		<h3>{title || translations['pt-br']['card-empty'].title}</h3>
		<p>{children}</p>
	</Container>
);
