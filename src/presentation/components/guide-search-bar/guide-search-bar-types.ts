import {PlanTypeEnum} from 'presentation/constants/bookingTypesEnum';
import {Dispatch, SetStateAction} from 'react';

export interface StatesProps {
	cdUf: string;
	nmUf: string;
}

export interface CityProps {
	estado: StatesProps;
	nmCidade: string;
}

export interface DistrictProps {
	nmBairro: string;
}

export interface ServicesTypesProps {
	nome: string;
}

export interface HealthSpecialtiesProps {
	nmEspecialidade: string;
}

export interface OdontoSpecialtiesProps {
	cdEspecialidade: number;
	dsEspecialidade: string;
}

export interface GuideSearchBarProps {
	selectedState?: string;
	selectedCity?: string;
	selectedService?: string;
	selectedSpecialty?: string;
	selectedDistrict?: string;
	cities?: CityProps[];
	states?: StatesProps[];
	districts?: DistrictProps[];
	type: PlanTypeEnum;
	services?: ServicesTypesProps[];
	healthSpecialties?: HealthSpecialtiesProps[];
	odontoSpecialties?: OdontoSpecialtiesProps[];
	handleGetCities?: (val: string) => void;
	handleGetServices?: (val: string) => void;
	handleGetProviders?: () => void;
	handleGetSpecialties?: (val: string) => void;
	handleGetNeighborhoods?: (val: string) => void;
	setSelectedDistrict?: Dispatch<SetStateAction<string>>;
	setSelectedSpecialties?: Dispatch<SetStateAction<string>>;
	setProviderName?: Dispatch<SetStateAction<string>>;
	providerName?: string;
}
