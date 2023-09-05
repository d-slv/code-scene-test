export type FormatAddressProps = {
	type?: string;
	address?: string;
	number?: string | number;
	district?: string;
	city?: string;
	state?: string;
	complement?: string;
	reference?: string;
	zipCode?: string | number;
};

export type TicketProps = {
	ticketTitle: string;
	appointmentDate: string;
	nmPrestadorJuridico: string;
	nmPrestadorFisico: string;
	nuProtocolo: string;
	nuTelefones?: string[];
	dsEspecialidade?: string;
	tipoConsulta?: string;
	nmTipoExame?: string;
	dsDescricao?: string;
	completeAddress?: string;
	separatedAddress?: FormatAddressProps;
};
