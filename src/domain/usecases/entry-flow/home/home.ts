import {ExamBooked} from 'domain/usecases/booked-flow';
import {BillData} from 'domain/usecases/my-payments-flow';

export type GetHomeParams = {
	cdUsuario: string;
};

export type AgendamentoConsulta = {
	cdEspecialidade: string;
	cdStatus: string;
	cdSubEspecialidade: string;
	cdUf: string;
	confirmado: string;
	dsSubEspecialidade: string;
	dsEspecialidade: string;
	dtConsulta: string;
	nmCidade: string;
	nmPrestadorFisico: string;
	nmPrestadorJuridico: string;
	nuConsulta: string;
	nuProtocolo: string;
	bairro: string;
	logradouro: string;
	numero: number;
	tipoLogradouro: string;
	telemedicina: string;
	tipoConsulta: string;
	urlconsulta: string;
	complemento: string;
	pontoReferencia: string;
	nuTelefone: string[];
};

export type GetHomeModel = {
	agendamentosOdonto: AgendamentoConsulta[];
	agendamentosSaude: AgendamentoConsulta[];
	agendamentosTeleconsulta: AgendamentoConsulta[];
	agendamentosExames: ExamBooked[];
	obrigacoesPendentes: BillData[];
};

export interface GetHome {
	get: () => Promise<GetHomeModel>;
}
