export type GetBeneficiaryContactsModel = {
	contato: {
		cdUsuario: string;
		nmUsuario: string;
		telefones: {
			telefone: string;
		}[];
		emails: {
			email: string;
		}[];
	};
};

export interface GetBeneficiaryContacts {
	get: () => Promise<GetBeneficiaryContactsModel>;
}
