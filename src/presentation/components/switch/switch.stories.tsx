import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import {Switch} from './index';

export default {
	title: 'COMPONENTS/Atoms/Switch',
	component: Switch,
} as ComponentMeta<typeof Switch>;

export const Select: ComponentStory<typeof Switch> = () => <Switch />;
