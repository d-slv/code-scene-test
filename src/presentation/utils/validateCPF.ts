export const isCPF = (value: string): boolean => {
	if (value.length > 11) return false;
	let add = 0;
	for (let i = 0; i < 9; i += 1) add += parseInt(value.charAt(i), 10) * (10 - i);
	let rev = 11 - (add % 11);
	if (rev === 10 || rev === 11) rev = 0;
	if (rev !== parseInt(value.charAt(9), 10)) return false;
	add = 0;
	for (let i = 0; i < 10; i += 1) add += parseInt(value.charAt(i), 10) * (11 - i);
	rev = 11 - (add % 11);
	if (rev === 10 || rev === 11) rev = 0;
	if (rev !== parseInt(value.charAt(10), 10)) return false;
	return true;
};
