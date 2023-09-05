import React from 'react';
import {PasswordStrengthMeter} from './password-strength-meter';

export default {
	title: 'COMPONENTS/Molecules/PasswordStrengthMeter',
	component: PasswordStrengthMeter,
};

const Template = args => <PasswordStrengthMeter {...args} pass={'123456'} />;

export const Default = Template.bind({});
Default.args = {};
