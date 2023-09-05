import React, {useCallback, useEffect, useRef, useState} from 'react';
import TagManager from 'react-gtm-module';
import {useRecoilValue} from 'recoil';
import amplitude from 'amplitude-js';

import {GuideResultCard} from 'presentation/components/card-guide-result';
import useWindowDimensions from 'presentation/hooks/useWindowDimensions';
import {GuideSearchBar} from 'presentation/components/guide-search-bar';
import {Loading} from 'presentation/components/loading';
import {translations} from 'presentation/translations';

import {GetProvidersDentalGuideModel, GetProvidersDetailsDentalGuideModel} from 'domain/usecases';
import {PlanTypeEnum} from 'presentation/constants/bookingTypesEnum';
import {accountDataState} from 'presentation/pages/entry-flow/atoms';
import {formatAddress} from 'presentation/components/ticket/ticket-utils';
import {emptyCardRender} from '../guide-utils';
import {
	CityProps,
	StatesProps,
	DistrictProps,
	OdontoGuideProps,
	ServicesTypesProps,
	OdontoSpecialtiesProps,
} from '../guide-types';
import {Container, ContentCards} from '../guide-styles';
import {LoadingContainer} from './styles';

export const OdontoGuide: React.FC<OdontoGuideProps> = ({
	states,
	getCities,
	getServices,
	getProviders,
	getSpecialties,
	getNeighborhoods,
	getProvidersDetails,
}) => {
	const {width, height} = useWindowDimensions();
	const [emptyCard, setEmptyCard] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [loadModal, setLoadModal] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage, setItemsPerPage] = useState(6);
	const [cities, setCities] = useState<CityProps[]>([]);
	const [selectedCity, setSelectedCity] = useState<string>();
	const [selectedState, setSelectedState] = useState<string>();
	const [districts, setDistricts] = useState<DistrictProps[]>([]);
	const [selectedService, setSelectedService] = useState<string>();
	const {beneficiary} = useRecoilValue(accountDataState);
	const [selectedDistrict, setSelectedDistrict] = useState<string>();
	const [odontoStates, setOdontoStates] = useState<StatesProps[]>([]);
	const [selectedSpecialties, setSelectedSpecialties] = useState<string>();
	const [providers, setProviders] = useState<GetProvidersDentalGuideModel>();
	const [servicesType, setServicesType] = useState<ServicesTypesProps[]>([]);
	const [specialties, setSpecialties] = useState<OdontoSpecialtiesProps[]>([]);
	const [providerDetails, setProviderDetails] = useState<GetProvidersDetailsDentalGuideModel>();

	const [loadingNewPage, setLoadingNewPage] = useState<boolean>(false);
	const containerRef = useRef(null);

	const responsivenessForScreens = () => {
		if (width > 1723) {
			setItemsPerPage(8);
		} else {
			setItemsPerPage(6);
		}
	};

	useEffect(() => {
		setIsLoading(true);
		responsivenessForScreens();
		document.title = translations['pt-br'].guideFlow.titleGuideOdonto;

		if (states) {
			states
				.get({cdPlanoANS: beneficiary.nuRegistroPlano})
				.then(response => {
					setOdontoStates(response.estados);
				})
				.catch(() => setEmptyCard(true))
				.finally(() => setIsLoading(false));
		}
	}, [states]);

	function handleGetCities(val: string) {
		if (getCities) {
			getCities
				.get({
					cdUf: val,
					cdPlanoANS: beneficiary.nuRegistroPlano,
				})
				.then(response => {
					setCities(response.cidades);
				})
				.catch(() => setEmptyCard(true));
		}
		setSelectedState(val);
		setSelectedCity('');
		setSelectedService('');
		setSelectedSpecialties('');
		setProviders(undefined);
	}

	function handleGetServices(val: string) {
		if (getServices) {
			getServices
				.get({
					cdUf: selectedState,
					nmCidade: val,
				})
				.then(response => {
					setServicesType(response.servicos);
				})
				.catch(() => setEmptyCard(true));
		}
		setSelectedCity(val);
		setSelectedSpecialties('');
		setSelectedService('');
		setProviders(undefined);
	}

	function handleGetSpecialties(val: string) {
		if (getSpecialties) {
			getSpecialties
				.get({
					cdUf: selectedState,
					cdPlanoANS: beneficiary.nuRegistroPlano,
				})
				.then(response => {
					setSpecialties(response.especialidades);
				})
				.catch(() => setEmptyCard(true));
		}
		setSelectedService(val);
		setSelectedSpecialties('');
		setProviders(undefined);
	}

	function handleGetNeighborhoods(val: string) {
		if (getNeighborhoods) {
			getNeighborhoods
				.get({
					cdUf: selectedState,
					nmCidade: selectedCity,
					dsServico: selectedService,
					cdPlanoANS: beneficiary.nuRegistroPlano,
					cdEspecialidade: val,
				})
				.then(response => {
					setDistricts(response.bairros);
				})
				.catch(() => setEmptyCard(true));
		}
		setSelectedSpecialties(val);
		setSelectedDistrict('');
		setProviders(undefined);
	}

	function handleGetProviders() {
		const tagManagerArgs = {
			gtmId: 'GTM-KQKN552',
			events: {
				sendUserInfo: 'Buscar no Guia Odonto',
			},
		};

		TagManager.initialize(tagManagerArgs);
		amplitude.getInstance().logEvent('Buscar no Guia Odonto');
		if (
			getProviders &&
			selectedState &&
			selectedCity &&
			selectedService &&
			selectedSpecialties &&
			getNeighborhoods
		) {
			setIsLoading(true);
			getProviders
				.get({
					cdEspecialidade: selectedSpecialties,
					cdUf: selectedState,
					nmCidade: selectedCity,
					nmBairro: selectedDistrict,
					dsTipo: selectedService,
				})
				.then(response => {
					setProviders(response);
				})
				.catch(() => setProviders(undefined))
				.finally(() => setIsLoading(false));
		}
	}

	const handleGetProvidersDetails = async (code: string): Promise<void> => {
		setLoadModal(true);
		getProvidersDetails
			.get({
				cdUf: selectedState,
				nmCidade: selectedCity,
				cdPrestador: code,
				dsTipo: selectedService,
			})
			.then(data => setProviderDetails(data))
			.finally(() => setLoadModal(false));
	};

	const containerScroll = useCallback(
		e => {
			const containerHeight =
				containerRef.current.offsetHeight + containerRef.current.offsetTop;
			const maxScroll = containerHeight - height;
			const maxPage = Math.ceil(providers.prestadores.length / itemsPerPage);

			if (e.target.scrollTop > maxScroll && currentPage < maxPage) {
				setLoadingNewPage(true);
			}
		},
		[providers, currentPage, itemsPerPage],
	);

	useEffect(() => {
		const contentContainer = document.getElementById('content-container');
		contentContainer.addEventListener('scroll', containerScroll, false);

		return () => {
			contentContainer.removeEventListener('scroll', containerScroll);
		};
	}, [providers, currentPage, itemsPerPage]);

	const indexOfLastPost = currentPage * itemsPerPage;
	const currentPosts = providers?.prestadores?.slice(0, indexOfLastPost);

	useEffect(() => {
		if (loadingNewPage) {
			setTimeout(() => {
				setCurrentPage(value => value + 1);
				setLoadingNewPage(false);
			}, 100);
		}
	}, [loadingNewPage]);

	return (
		<Container ref={containerRef}>
			{isLoading ? (
				<Loading />
			) : (
				<>
					<GuideSearchBar
						type={PlanTypeEnum.ODONTO}
						cities={cities}
						states={odontoStates}
						districts={districts}
						services={servicesType}
						selectedCity={selectedCity}
						selectedState={selectedState}
						odontoSpecialties={specialties}
						selectedService={selectedService}
						handleGetCities={handleGetCities}
						selectedDistrict={selectedDistrict}
						handleGetServices={handleGetServices}
						selectedSpecialty={selectedSpecialties}
						handleGetProviders={handleGetProviders}
						setSelectedDistrict={setSelectedDistrict}
						handleGetSpecialties={handleGetSpecialties}
						handleGetNeighborhoods={handleGetNeighborhoods}
					/>
					<ContentCards isEmpty={providers === undefined}>
						{!providers ||
						!selectedCity ||
						!selectedState ||
						!selectedService ||
						!selectedSpecialties
							? emptyCardRender(emptyCard)
							: currentPosts?.map(item => (
									<GuideResultCard
										cardType={PlanTypeEnum.ODONTO}
										address={formatAddress({
											address: item.logradouro,
											number: item.numero,
											complement: item.complemento,
											district: item.bairro,
											city: item.cidade,
											state: item.uf,
											zipCode: item.cep,
										})}
										key={item.nome}
										type={item.tipo}
										loading={loadModal}
										provider={item.nome}
										contacts={item.contatos}
										markers={item.marcadores}
										providerCode={item.codigo}
										registrationNumber={item.cnpj}
										detailsOdonto={providerDetails}
										documentType={item.tipoDocumento}
										documentNumber={item.nuDocumento}
										qualifications={item.qualificacoes}
										requestCode={handleGetProvidersDetails}
									/>
							  ))}
					</ContentCards>
					{providers?.prestadores?.length
						? currentPage < Math.ceil(providers.prestadores.length / itemsPerPage) && (
								<LoadingContainer>{loadingNewPage && <Loading />}</LoadingContainer>
						  )
						: undefined}
				</>
			)}
		</Container>
	);
};
