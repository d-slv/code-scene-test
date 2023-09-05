/* eslint-disable no-plusplus */
export function formatText(text: string): string {
	if (!text) return '';

	const lowercaseText = text.toLowerCase();
	const words = lowercaseText.split(' ');
	for (let a = 0; a < words.length; a++) {
		let word = words[a];

		const firstLetter = word[0];

		if (word.length >= 2) {
			word = firstLetter.toUpperCase() + word.slice(1);
		} else {
			word = firstLetter + word.slice(1);
		}

		words[a] = word;
	}
	return words.join(' ');
}

export function formatCompleteAddress(text: string): string {
	const separateAddress = text.toLowerCase().split(' - ');

	function capitalize(textAddress: string) {
		return textAddress
			.split(' ')
			.map(word => word.charAt(0).toUpperCase() + word.substring(1))
			.join(' ');
	}

	const capitalizedAddress = separateAddress.map(value => capitalize(value));

	const cityAndUf = capitalizedAddress.pop();
	const city = cityAndUf.split('/')[0];
	const uf = cityAndUf.split('/')[1].toUpperCase();
	const formattedCityAndUf = `${city}/${uf}`;

	capitalizedAddress.push(formattedCityAndUf);

	return capitalizedAddress.join(' - ');
}
