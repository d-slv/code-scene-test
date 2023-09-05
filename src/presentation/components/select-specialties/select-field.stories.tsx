import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import {SelectField, Option} from './select-field-specialties';

export default {
	title: 'COMPONENTS/Atoms/SelectField',
	component: SelectField,
} as ComponentMeta<typeof SelectField>;

export const Select: ComponentStory<typeof SelectField> = () => (
	<SelectField>
		<Option value="2020">2020</Option>
		<Option value="2019">2019</Option>
		<Option value="2018">2018</Option>
		<Option value="2017">2017</Option>
	</SelectField>
);
