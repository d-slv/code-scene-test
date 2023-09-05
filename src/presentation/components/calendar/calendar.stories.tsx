import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import {Calendar} from './calendar';

export default {
	title: 'COMPONENTS/Molecules/Calendar',
	component: Calendar,
} as ComponentMeta<typeof Calendar>;

export const Default: ComponentStory<typeof Calendar> = () => (
	<Calendar
		onChange={() => {
			'calendar';
		}}
	/>
);
