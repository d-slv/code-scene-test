import {Dispatch, SetStateAction} from 'react';
import {
	// Medical
	GetStatesMedicalGuide,
	GetCitiesMedicalGuide,
	GetServicesMedicalGuide,
	GetProvidersMedicalGuide,
	GetProvidersDetailsMedicalGuide,
	GetSpecialtiesSubSpecialtiesMedicalGuide,

	// Odonto
	GetStatesDentalGuide,
	GetCitiesDentalGuide,
	GetServicesDentalGuide,
	GetProvidersDentalGuide,
	GetNeighborhoodsDentalGuide,
	GetProvidersDetailsDentalGuide,
	GetSpecialtiesSubSpecialtiesDentalGuide,
} from 'domain/usecases';

export interface SetItemsPerPage {
	setItemsPerPage: Dispatch<SetStateAction<number>>;
}

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

export interface HealthGuideProps {
	states: GetStatesMedicalGuide;
	getCities: GetCitiesMedicalGuide;
	getServices: GetServicesMedicalGuide;
	getProviders: GetProvidersMedicalGuide;
	getProvidersDetails: GetProvidersDetailsMedicalGuide;
	getSpecialties: GetSpecialtiesSubSpecialtiesMedicalGuide;
}

export interface OdontoGuideProps {
	states: GetStatesDentalGuide;
	getCities: GetCitiesDentalGuide;
	getServices: GetServicesDentalGuide;
	getProviders: GetProvidersDentalGuide;
	getNeighborhoods: GetNeighborhoodsDentalGuide;
	getProvidersDetails: GetProvidersDetailsDentalGuide;
	getSpecialties: GetSpecialtiesSubSpecialtiesDentalGuide;
}
