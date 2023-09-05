export const formatMasks = (option: string, value: string): string => {
	switch (option) {
		case 'cpf':
			return value
				.replace(/[^\d]+/g, '')
				.replace(/(\d{3})(\d)/, '$1.$2')
				.replace(/(\d{3})(\d)/, '$1.$2')
				.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
		case 'cnpj':
			return value
				.replace(/[^\d]+/g, '')
				.replace(/(\d{2})(\d)/, '$1.$2')
				.replace(/(\d{3})(\d)/, '$1.$2')
				.replace(/(\d{3})(\d)/, '$1/$2')
				.replace(/(\d{4})(\d)/, '$1-$2')
				.replace(/(\d{2})(\d)$/, '$1');
		case 'carteirinha':
			return value
				.replace(/[^\w]+/g, '')
				.replace(/^(\w{5})(\w)/, '$1.$2')
				.replace(/\.(\w{6})(\w)/, '.$1/$2')
				.replace(/\/(\w{2})(\w)$/, '/$1-$2')
				.toUpperCase();
		case 'date':
			return value
				.replace(/\D/g, '')
				.replace(/(\d{2})(\d)/, '$1/$2')
				.replace(/(\d{2})(\d)/, '$1/$2')
				.replace(/(\d{4})(\d)$/, '$1');
		case 'phone':
			return value
				.replace(/\D/g, '')
				.replace(/(\d{2})(\d)/, '($1) $2')
				.replace(/(?:([2-8])|(9[1-9]))(\d{3})(\d)/, '$1$2$3-$4')
				.replace(/(-\d{4})(\d+?)$/, '$1');
		case 'token':
			return value.replace(/(\d{4})(\d)/, '$1-$2');
		case 'hidePhone':
			return value.replace(/(\d{2})\d{5}(\d{4})/, '($1)*****-$2');
		case 'hideEmail':
			return value.replace(
				/^(..)([^.@]*)(..@.*)$/,
				(_, a, b, c) => a + b.replace(/./g, '*') + c,
			);
		case 'examCode':
			return value.replace(/(\w{9})/, '$1');
		case 'clear':
			return value.replace(/[^\w]+/g, '');
		default:
			return '';
	}
};
