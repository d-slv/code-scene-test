import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import {CardFiveStarsReview} from './card-five-stars-review';

export default {
	title: 'Components/Molecules/CardFiveStarsReview',
	component: CardFiveStarsReview,
} as ComponentMeta<typeof CardFiveStarsReview>;

export const Default: ComponentStory<typeof CardFiveStarsReview> = () => <CardFiveStarsReview />;
