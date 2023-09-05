import moment from 'moment';

export const formatDate = (type: string, date: string): string => {
	switch (type) {
		case 'M/yyyy':
			return (
				moment(date, 'DD/MM/YYYY').locale('pt').format('MMMM/YYYY')[0].toUpperCase() +
				moment(date, 'DD/MM/YYYY').locale('pt').format('MMMM/YYYY').slice(1)
			);
		case 'dd/mm/yyyy':
			return moment(date, 'DD/MM/YYYY').format('DD/MM/YYYY');
		case 'Y':
			return moment(date, 'DD/MM/YYYY').format('YYYY');
		default:
			return '';
	}
};
