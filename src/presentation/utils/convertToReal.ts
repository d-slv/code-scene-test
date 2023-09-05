export const convertToReal = (value: number | string): string => {
	const convert = (parsedValue: number): string =>
		parsedValue
			.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})
			.split('R$')[1]
			.trim();

	switch (typeof value) {
		case 'number':
			return convert(value);
		case 'string':
			return convert(parseFloat(value));
		default:
			return '';
	}
};
