export type PostIncomeTaxDetailsParams = {
	ano: string;
};

export type IncomeTaxDetails = {
	cdUsuario: string;
	dsEnderecoFontePagadora: string;
	dsFonteRecebedora: string;
	dsSituacaoUsuario: string;
	dtEmissao: string;
	nuCnpjFonteRecebedora: string;
	nuValorTotalPago: string;
	listaValoresPorBeneficiarios: {
		nmBeneficiario: string;
		dsTipoBeneficiario: string;
		nuVlNominalBeneficiario: string;
		nuVlNominalBeneficiarioFormatado: string;
	}[];
};

export type PostIncomeTaxDetailsModel = {
	impostoDeRenda: IncomeTaxDetails[];
};

export interface PostIncomeTaxDetails {
	post: (params: PostIncomeTaxDetailsParams) => Promise<PostIncomeTaxDetailsModel>;
}
