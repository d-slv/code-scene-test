import moment from 'moment';
import {formatCompleteAddress} from 'presentation/utils';
import {FormatAddressProps} from './ticket.types';

export const getDayOfWeek = (value: string): string =>
	moment(value, 'D/M/YYYY').locale('pt-br').format('dddd');

export const formatAddress = (data: FormatAddressProps): string => {
	const {type, address, number, district, city, state, complement, reference, zipCode} = data;

	const addressData = {
		type: type || '',
		address: address ? `${address}` : '',
		number: number ? `, ${number}` : '',
		complement: complement ? ` - ${complement}` : '',
		reference: reference ? ` - (${reference})` : '',
		district: district ? ` - ${district}` : '',
		city: city ? `${city}` : '',
		state: state ? `${state}` : '',
		zipCode: zipCode ? ` - CEP: ${zipCode}` : '',
	};

	const completeAddress = `${addressData.type} ${addressData.address}${addressData.number}${addressData.complement}${addressData.reference}${addressData.district} - ${addressData.city}/${addressData.state}`;

	return `${formatCompleteAddress(completeAddress)}${addressData.zipCode}`;
};
