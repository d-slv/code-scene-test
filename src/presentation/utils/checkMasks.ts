export const checkMasks = (option: string, value: string): boolean => {
	switch (option) {
		case 'cpf':
			return /^\d{3}\.\d{3}\.\d{3}\\-\d{2}$/.test(value);
		case 'cnpj':
			return /^\d{2}\.\d{3}\.\d{3}\/\d{4}\\-\d{2}$/.test(value);
		case 'carteirinha':
			return /^\w{5}\.\d{6}\/\d{2}\\-\d\$/.test(value);
		case 'email':
			return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value);
		case 'date':
			return /^([0-2]\d|(3)[0-1])\/(((0)\d)|((1)[0-2]))\/\d{4}$/.test(value);
		case 'phone':
			return /^\(\d{2}\) (?:([2-8])|(9[1-9]))(\d{3})(-\d{4})$/.test(value);
		case 'password':
			return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#!])[0-9a-zA-Z$*&@#!]{6,}$/.test(
				value,
			);
		case 'opCode':
			return /d{6}$/.test(value);
		case 'examCode':
			return /[0-9A-Z]{9}$/.test(value);
		default:
			return false;
	}
};
