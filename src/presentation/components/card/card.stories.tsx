import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import {Card} from '.';

export default {
	title: 'COMPONENTS/Atoms/Card',
	component: Card,
} as ComponentMeta<typeof Card>;

export const Default: ComponentStory<typeof Card> = () => <Card />;
