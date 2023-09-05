import React, {useState} from 'react';
import {MdSearch} from 'react-icons/md';
import {formatText} from 'presentation/utils';
import useWindowDimensions from 'presentation/hooks/useWindowDimensions';
import {translations} from 'presentation/translations';
import {atom} from 'recoil';
import {PlanTypeEnum} from 'presentation/constants/bookingTypesEnum';
import {SidebarTitlesEnum} from 'presentation/constants/pageTitlesEnum';
import {GuideSearchBarProps} from './guide-search-bar-types';

import {
	Header,
	Button,
	SubHeader,
	SearchQueries,
	ContentSelects,
	ContentWrapper,
	Subtitle,
	SearchByProviderInput,
	SearchBar,
} from './guide-search-bar.styles';
import {SelectField} from '../select-field';

export const ProviderNameState = atom({
	key: 'ProviderName',
	default: '',
});

export const GuideSearchBar: React.FC<GuideSearchBarProps> = ({
	type,
	cities,
	states,
	services,
	districts,
	selectedCity,
	selectedState,
	handleGetCities,
	selectedService,
	selectedDistrict,
	odontoSpecialties,
	healthSpecialties,
	selectedSpecialty,
	handleGetServices,
	handleGetProviders,
	setSelectedDistrict,
	handleGetSpecialties,
	handleGetNeighborhoods,
	setSelectedSpecialties,
	providerName,
	setProviderName,
}) => {
	const {width} = useWindowDimensions();
	const mobileScreen = width <= 870;

	const [isOpenMobile, setIsOpenMobile] = useState(false);
	const localTranslations = translations['pt-br'].guideFlow;

	const mobileButtonRender = (condition: boolean) => {
		if (condition) {
			return (
				<Button
					variant={type}
					onClick={() => {
						setIsOpenMobile(!isOpenMobile);
					}}>
					{localTranslations.changeSearch}
				</Button>
			);
		}
		return (
			<Button
				variant={type}
				onClick={() => {
					handleGetProviders();
					setIsOpenMobile(!isOpenMobile);
				}}
				disabled={!selectedService}>
				{
					localTranslations[
						type === PlanTypeEnum.HEALTH ? 'searchInGuideHealth' : 'searchInGuideOdonto'
					]
				}
			</Button>
		);
	};

	const renderList = (item: string) => {
		if (item === 'StatesProps') {
			return states?.map(s => (
				<option value={s.cdUf} key={s.cdUf}>
					{formatText(s.nmUf)}
				</option>
			));
		}
		if (item === 'CityProps') {
			return cities?.map(s => (
				<option value={s.nmCidade} key={s.nmCidade}>
					{formatText(s.nmCidade)}
				</option>
			));
		}
		if (item === 'DistrictProps') {
			return districts?.map(s => (
				<option value={s.nmBairro} key={s.nmBairro}>
					{formatText(s.nmBairro)}
				</option>
			));
		}
		if (item === 'ServicesTypesProps') {
			return services?.map(s => (
				<option value={s.nome} key={s.nome}>
					{formatText(s.nome)}
				</option>
			));
		}
		if (item === 'SpecialtiesHealthProps') {
			return healthSpecialties?.map(s => (
				<option value={s.nmEspecialidade} key={s.nmEspecialidade}>
					{formatText(String(s.nmEspecialidade))}
				</option>
			));
		}
		return odontoSpecialties?.map(s => (
			<option value={s.cdEspecialidade} key={s.cdEspecialidade}>
				{formatText(s.dsEspecialidade)}
			</option>
		));
	};

	return (
		<SearchBar type={type}>
			<Header>
				{type === PlanTypeEnum.HEALTH
					? SidebarTitlesEnum.GUIDE_HEALTH
					: SidebarTitlesEnum.GUIDE_ODONTO}
			</Header>

			{mobileScreen && isOpenMobile && (
				<>
					<SubHeader>{localTranslations.searchResult}</SubHeader>
					<SearchQueries>
						{`${selectedState} - ${selectedCity} - ${selectedService} - ${selectedSpecialty}`}
					</SearchQueries>
				</>
			)}

			<>
				<ContentSelects type={type}>
					{(!isOpenMobile || !mobileScreen) && (
						<>
							<ContentWrapper>
								<Subtitle>Preencha para pesquisar:</Subtitle>
								<SelectField
									fullWidth
									size="sm"
									placeholder={localTranslations.selectState}
									onChange={val => handleGetCities(val)}
									value={selectedState}>
									{renderList('StatesProps')}
								</SelectField>
							</ContentWrapper>
							<ContentWrapper>
								{' '}
								<SelectField
									fullWidth
									size="sm"
									placeholder={localTranslations.selectCity}
									onChange={val => handleGetServices(val)}
									value={selectedCity}
									disabled={cities.length < 1}>
									{renderList('CityProps')}
								</SelectField>
							</ContentWrapper>
							<ContentWrapper>
								<SelectField
									fullWidth
									size="sm"
									placeholder={localTranslations.selectService}
									onChange={val => handleGetSpecialties(val)}
									value={selectedService}
									disabled={services.length < 1}>
									{renderList('ServicesTypesProps')}
								</SelectField>
							</ContentWrapper>

							{type === PlanTypeEnum.HEALTH ? (
								<ContentWrapper>
									<SelectField
										fullWidth
										size="sm"
										placeholder={localTranslations.selectSpecialty}
										value={selectedSpecialty}
										onChange={val => setSelectedSpecialties(val)}
										disabled={healthSpecialties.length < 1}>
										<option value="">
											{localTranslations.selectSpecialty}
										</option>
										{renderList('SpecialtiesHealthProps')}
									</SelectField>
								</ContentWrapper>
							) : (
								<>
									<ContentWrapper>
										<SelectField
											fullWidth
											size="sm"
											placeholder={localTranslations.selectSpecialty}
											value={selectedSpecialty}
											onChange={val => handleGetNeighborhoods(val)}
											disabled={odontoSpecialties.length < 1}>
											{/* <option value="">
												{localTranslations.selectSpecialty}
											</option> */}
											{renderList('Specialties')}
										</SelectField>
									</ContentWrapper>

									<ContentWrapper>
										<SelectField
											fullWidth
											size="sm"
											placeholder={localTranslations.selectDistrict}
											onChange={val => setSelectedDistrict(val)}
											value={selectedDistrict}
											disabled={districts.length < 1}>
											<option value="">
												{localTranslations.selectDistrict}
											</option>
											{renderList('DistrictProps')}
										</SelectField>
									</ContentWrapper>
								</>
							)}
							<ContentWrapper>
								<Subtitle>Pesquise por prestador (Opcional):</Subtitle>
								<SearchByProviderInput
									placeholder="Digite o nome do prestador"
									value={providerName}
									onChange={({target: {value}}) => setProviderName(value)}
								/>
							</ContentWrapper>
						</>
					)}

					{mobileScreen ? (
						mobileButtonRender(isOpenMobile)
					) : (
						<Button
							variant={type}
							disabled={!selectedService}
							onClick={() => {
								handleGetProviders();
								setIsOpenMobile(!isOpenMobile);
							}}>
							<MdSearch />
						</Button>
					)}
				</ContentSelects>
			</>
		</SearchBar>
	);
};
