import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import {WarningBar} from './warning-bar';

export default {
	/* 👇 The title prop is optional.
	 * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
	 * to learn how to generate automatic titles
	 */
	title: 'WarningBar',
	component: WarningBar,
} as ComponentMeta<typeof WarningBar>;

const args = {
	content: 'Just a test!',
};

export const Default: ComponentStory<typeof WarningBar> = () => <WarningBar {...args} />;
