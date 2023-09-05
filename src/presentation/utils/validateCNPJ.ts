export const isCNPJ = (value: string): boolean => {
	if (value.length > 14) return false;
	const cnpj = value.split('');
	let v1 = 0;
	let v2 = 0;
	let aux = false;
	for (let i = 1; cnpj.length > i; i += 1) if (cnpj[i - 1] !== cnpj[i]) aux = true;
	if (aux === false) return false;
	for (let i = 0, p1 = 5, p2 = 13; cnpj.length - 2 > i; i += 1, p1 -= 1, p2 -= 1)
		v1 += p1 >= 2 ? parseInt(cnpj[i], 10) * p1 : parseInt(cnpj[i], 10) * p2;
	v1 %= 11;
	v1 = v1 < 2 ? 0 : 11 - v1;
	if (v1 !== parseInt(cnpj[12], 10)) return false;
	for (let i = 0, p1 = 6, p2 = 14; cnpj.length - 1 > i; i += 1, p1 -= 1, p2 -= 1)
		v2 += p1 >= 2 ? parseInt(cnpj[i], 10) * p1 : parseInt(cnpj[i], 10) * p2;
	v2 %= 11;
	v2 = v2 < 2 ? 0 : 11 - v2;
	if (v2 !== parseInt(cnpj[13], 10)) return false;
	return true;
};
