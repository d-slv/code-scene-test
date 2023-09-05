import React, {FormEvent, useState} from 'react';
import {MdSearch} from 'react-icons/md';
import * as S from './search-bar.styles';
import {translations} from '../../translations';

interface SearchBarProps {
	onChange?: (value: string) => void;
	onSubmit?: (value: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({onChange, onSubmit}) => {
	const [value, setValue] = useState('');

	function handleSubmit(e: FormEvent) {
		e.preventDefault();
		if (onSubmit) {
			onSubmit(value);
		}
	}

	function handleChange(v: string) {
		setValue(v);
		if (onChange) {
			onChange(v);
		}
	}

	return (
		<form onSubmit={handleSubmit}>
			<S.SearchBar>
				<input
					type="text"
					value={value}
					onChange={event => handleChange(event.target.value)}
					placeholder={translations['pt-br'].searchBar.placeholder}
				/>
				<button>
					<MdSearch />
				</button>
			</S.SearchBar>
		</form>
	);
};
