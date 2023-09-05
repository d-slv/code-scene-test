import {BeneficiaryModel} from 'domain/usecases/entry-flow/beneficiary';

export type GetSidebarModel = {
	sideBar: {
		flUsuarioInadimplente: boolean;
		flPlanoSomenteHospitalar: boolean;
		ctOperacional: {
			cdEmpresa: string;
			ativo: boolean;
			exigeSenha: boolean;
			mensagem: string;
			permitirMarcacao: boolean;
		};
		nmTitularContrato: string;
		flNascerBem: boolean;
		flViverBem: boolean;
		flMedicoFamilia: boolean;
		flPad: boolean;
		flAdministradora: boolean;
	};
	beneficiary: BeneficiaryModel;
};

export interface GetSidebar {
	getSidebarData: () => Promise<GetSidebarModel>;
}
