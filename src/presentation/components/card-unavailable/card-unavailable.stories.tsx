import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import {CardUnavailable} from './card-unavailable';

export default {
	/* 👇 The title prop is optional.
	 * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
	 * to learn how to generate automatic titles
	 */
	title: 'Card Unavailable',
	component: CardUnavailable,
} as ComponentMeta<typeof CardUnavailable>;

export const Default: ComponentStory<typeof CardUnavailable> = () => (
	<CardUnavailable type={'place'} user={''} roomType={'health'} />
);
