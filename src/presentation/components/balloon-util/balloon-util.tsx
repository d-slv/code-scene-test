import React from 'react';
import {BalloonUtilTypes} from '.';
import {Container} from './balloon-util.styles';

export function BalloonUtil({children, color = 'secondary'}: BalloonUtilTypes) {
	return <Container color={color}>{children}</Container>;
}
