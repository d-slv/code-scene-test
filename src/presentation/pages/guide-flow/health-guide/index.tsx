import {GetProvidersMedicalGuideModel, GetProvidersDetailsMedicalGuideModel} from 'domain/usecases';
import React, {useEffect, useState, useRef, useCallback} from 'react';
import {useRecoilValue} from 'recoil';

import {GuideResultCard} from 'presentation/components/card-guide-result';
import useWindowDimensions from 'presentation/hooks/useWindowDimensions';
import {GuideSearchBar} from 'presentation/components/guide-search-bar';
import {PlanTypeEnum} from 'presentation/constants/bookingTypesEnum';
import {Loading} from 'presentation/components/loading';
import {translations} from 'presentation/translations';

import {accountDataState} from 'presentation/pages/entry-flow/atoms';
import {formatAddress} from 'presentation/components/ticket/ticket-utils';
import {emptyCardRender} from '../guide-utils';
import {
	CityProps,
	StatesProps,
	HealthGuideProps,
	ServicesTypesProps,
	HealthSpecialtiesProps,
} from '../guide-types';
import {Container, ContentCards} from '../guide-styles';
import {LoadingContainer} from './styles';

export const HealthGuide: React.FC<HealthGuideProps> = ({
	states,
	getCities,
	getServices,
	getProviders,
	getSpecialties,
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
	const {beneficiary} = useRecoilValue(accountDataState);
	const [selectedService, setSelectedService] = useState<string>();
	const [medicalStates, setMedicalStates] = useState<StatesProps[]>([]);
	const [selectedSpecialties, setSelectedSpecialties] = useState<string>('');
	const [servicesType, setServicesType] = useState<ServicesTypesProps[]>([]);
	const [providers, setProviders] = useState<GetProvidersMedicalGuideModel>();
	const [specialties, setSpecialties] = useState<HealthSpecialtiesProps[]>([]);
	const [providerDetails, setProviderDetails] = useState<GetProvidersDetailsMedicalGuideModel>();
	const [providerName, setProviderName] = useState<string>();
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
		document.title = translations['pt-br'].guideFlow.titleGuideHealth;

		if (states) {
			states
				.get({cdPlanoANS: beneficiary.nuRegistroPlano})
				.then(response => {
					setMedicalStates(response.estados);
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
					cdPlanoANS: beneficiary.nuRegistroPlano,
					cdUf: selectedState,
					nmCidade: selectedCity,
					nmServico: val,
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

	function handleGetProviders() {
		if (getProviders && selectedState && selectedCity && selectedService) {
			setIsLoading(true);
			setCurrentPage(1);

			getProviders
				.get({
					cdUf: selectedState,
					nmCidade: selectedCity,
					dsTipo: selectedService,
					dsEspecialidade: selectedSpecialties,
					nmPrestador: providerName,
				})
				.then(response => {
					setProviders(response);
				})
				.catch(() => {
					setEmptyCard(true);
					setProviders(undefined);
				})
				.finally(() => {
					setIsLoading(false);
				});
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
				cdRedeHap: 'LN',
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
						cities={cities}
						type={PlanTypeEnum.HEALTH}
						states={medicalStates}
						services={servicesType}
						selectedCity={selectedCity}
						selectedState={selectedState}
						healthSpecialties={specialties}
						selectedService={selectedService}
						handleGetCities={handleGetCities}
						handleGetServices={handleGetServices}
						selectedSpecialty={selectedSpecialties}
						handleGetProviders={handleGetProviders}
						handleGetSpecialties={handleGetSpecialties}
						setSelectedSpecialties={setSelectedSpecialties}
						providerName={providerName}
						setProviderName={setProviderName}
					/>

					<ContentCards isEmpty={providers === undefined}>
						{!providers || !selectedCity || !selectedState || !selectedService
							? emptyCardRender(emptyCard)
							: currentPosts?.map((item, index) => (
									<GuideResultCard
										cardType={PlanTypeEnum.HEALTH}
										address={formatAddress({
											address: item.logradouro,
											complement: item.dsComplEndereco,
											district: item.nmBairro,
											city: item.nmCidade,
											state: item.cdUf,
											zipCode: item.cep,
										})}
										type={item.tipo}
										loading={loadModal}
										key={index}
										documentType={'CRM/CNES'}
										provider={item.nmPrestador}
										contacts={
											item.nuTelefone
												? item.nuTelefone.split('/').slice(0, -1)
												: undefined
										}
										documentNumber={item.crmcnes}
										detailsHealth={providerDetails}
										providerCode={String(item.codigo)}
										qualifications={item.qualificacoes}
										requestCode={handleGetProvidersDetails}
										registrationNumber={item.cgccpf}
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
