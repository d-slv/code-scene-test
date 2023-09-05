import React, {ReactNode} from 'react';

import {Container, Title} from './styles';

interface InnerCardProps {
	title: string;
	children: ReactNode;
}

export function InnerCard({title, children}: InnerCardProps) {
	return (
		<Container>
			<Title>{title}</Title>
			{children}
		</Container>
	);
}
