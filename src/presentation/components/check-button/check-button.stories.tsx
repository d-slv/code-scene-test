import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import {CheckButton} from './check-button';

export default {
	/* 👇 The title prop is optional.
	 * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
	 * to learn how to generate automatic titles
	 */
	title: 'COMPONENTS/Atoms/Check button',
	component: CheckButton,
} as ComponentMeta<typeof CheckButton>;

export const Default: ComponentStory<typeof CheckButton> = () => (
	<CheckButton>Check button</CheckButton>
);
