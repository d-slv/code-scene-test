import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import {SelectLocationField, Option} from './select-location-field';

export default {
	title: 'Select Field',
	component: SelectLocationField,
} as ComponentMeta<typeof SelectLocationField>;

export const Select: ComponentStory<typeof SelectLocationField> = () => (
	<SelectLocationField>
		<Option value="0">Selecione a Cidade</Option>
		<Option value="1">Fortaleza</Option>
		<Option value="2">Juazeiro do Norte</Option>
		<Option value="3">Sobral</Option>
		<Option value="4">Iguatu</Option>
		<Option value="5">Aracati</Option>
	</SelectLocationField>
);
