import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import {CardCheckBox} from './card-check-box';

export default {
	title: 'COMPONENTS/Atoms/CardCheckBox',
	component: CardCheckBox,
} as ComponentMeta<typeof CardCheckBox>;

export const Default: ComponentStory<typeof CardCheckBox> = () => <CardCheckBox value={''} />;
