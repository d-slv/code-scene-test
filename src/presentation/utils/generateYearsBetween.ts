/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */
export function generateYearsBetween(startYear: number, endYear?: number): string[] {
	const endDate = endYear || new Date().getFullYear();
	const years = [];

	for (let i = startYear; i <= endDate; i++) {
		years.push(startYear);
		startYear++;
	}

	const parsedYears = years.map(year => String(year)).reverse();
	return parsedYears;
}
