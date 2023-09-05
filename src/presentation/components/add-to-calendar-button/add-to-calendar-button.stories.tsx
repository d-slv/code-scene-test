import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import AddToCalendarButton from './add-to-calendar-button';

export default {
	title: 'COMPONENTS/Atoms/AddToCalendarButton',
	component: AddToCalendarButton,
} as ComponentMeta<typeof AddToCalendarButton>;

export const ButtonCalendar: ComponentStory<typeof AddToCalendarButton> = () => (
	<AddToCalendarButton calendarEvent={undefined} />
);
