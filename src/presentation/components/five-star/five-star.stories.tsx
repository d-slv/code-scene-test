import React from 'react';
import {FiveStar} from './five-star';

export default {
	title: 'Components/Organism/FiveStar',
	component: FiveStar,
	argsTypes: {},
};

const Template = args => <FiveStar {...args}>FiveStar</FiveStar>;

export const Default = Template.bind({});
Default.args = {};
