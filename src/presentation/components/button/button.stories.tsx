import React from 'react';
import {Button} from './button';

export default {
	title: 'COMPONENTS/Atoms/Button',
	component: Button,
	argTypes: {
		fontSize: {
			options: ['xxs', 'xxs', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl', 'xxl', 'display'],
			control: {type: 'select'},
		},
		fontWeight: {
			options: ['bold', 'medium', 'regular'],
			control: {type: 'inline-radio'},
		},
		borderWidth: {
			options: ['none', 'hairline', 'thin', 'tick', 'heavy'],
			control: {type: 'select'},
		},
		borderRadius: {
			options: ['none', 'md', 'lg', 'pill', 'circular'],
			control: {type: 'select'},
		},
		variant: {
			options: ['contained', 'outlined'],
			control: {type: 'inline-radio'},
		},
		color: {
			options: [
				'primary',
				'secondary',
				'success',
				'warning',
				'danger',
				'orange.400',
				'SecondaryBlue.500',
			],
			control: {type: 'select'},
		},
		fullWidth: {
			control: {type: 'boolean'},
		},
	},
};

const Template = args => <Button {...args}>Botão</Button>;

export const Default = Template.bind({});
Default.args = {
	fontSize: 'xs',
	fontWeight: 'regular',
	variant: 'contained',
	color: 'primary',
	borderWidth: 'hairline',
	borderRadius: 'md',
	fullWidth: false,
};
