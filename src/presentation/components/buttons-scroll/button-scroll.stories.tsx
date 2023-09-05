import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import ButtonsScroll from './buttons-scroll';

export default {
	title: 'COMPONENTS/Atoms/ButtonsScroll',
	component: ButtonsScroll,
} as ComponentMeta<typeof ButtonsScroll>;

export const ButtonScroll: ComponentStory<typeof ButtonsScroll> = () => (
	<ButtonsScroll reference={undefined} />
);
