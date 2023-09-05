import React, {useEffect, useMemo, useState} from 'react';
import {useRecoilValue} from 'recoil';
import {formatText} from 'presentation/utils';
import {contractMenuStates} from 'presentation/pages/states/atoms';
import {CardCategory} from 'presentation/components/card-category';
import {HelperIcon} from 'presentation/components/icons/helper-icon';
import {CardListResult} from 'presentation/components/card-list-result';
import {GetCategories, GetServices, GetSubCategories} from 'domain/usecases';
import {CardListCategories} from 'presentation/components/card-list-categories';
import {CardServiceChannel} from 'presentation/components/card-service-channel';
import * as S from './styles';

type Props = {
	services: GetServices;
	categories: GetCategories;
	subCategories: GetSubCategories;
};

export const HelpCenter: React.FC<Props> = ({services, categories, subCategories}) => {
	const [show, setShow] = useState(true);
	const [channelData, setChannelData] = useState([]);
	const [wordEntered, setWordEntered] = useState('');
	const contract = useRecoilValue(contractMenuStates);
	const [categoryList, setCategoryList] = useState([]);
	const [filteredData, setFilteredData] = useState([]);
	const [categoryData, setCategoryData] = useState([]);
	const [selectedIndex, setSelectedIndex] = useState(null);
	const [subcategoryData, setSubcategoryData] = useState([]);
	const [selectedCategory, setSelectedCategory] = useState();

	const RequestServices = async (): Promise<void> => {
		try {
			const stateResult = await services.getServices();
			setChannelData(stateResult.data);
		} catch (error) {
			alert(error);
		}
	};

	const RequestCategories = async (): Promise<void> => {
		try {
			const stateResult = await categories.getCategories();
			setCategoryData(stateResult.data);
		} catch (error) {
			alert(error);
		}
	};

	const RequestSubCategories = async (): Promise<void> => {
		try {
			const stateResult = await subCategories.getSubCategories();
			setSubcategoryData(stateResult.data);
			setCategoryList(stateResult.data);
		} catch (error) {
			alert(error);
		}
	};

	useEffect(() => {
		RequestServices();
		RequestCategories();
		RequestSubCategories();
	}, []);

	function getFilteredList() {
		if (!selectedCategory) {
			return categoryList;
		}
		return categoryList.filter(item => item.attributes.attributes.title === selectedCategory);
	}

	const filteredList = useMemo(getFilteredList, [selectedCategory, categoryList]);

	const handleFilter = event => {
		const searchWord = event.target.value;
		setWordEntered(searchWord);

		const newFilter = subcategoryData.filter(value =>
			value.title.toLowerCase().includes(searchWord.toLowerCase()),
		);

		if (searchWord === '') {
			setFilteredData([]);
		} else {
			setFilteredData(newFilter);
		}
	};

	return (
		<>
			{!selectedCategory ? (
				<>
					<S.HeaderCardHelper>
						<S.HeaderContentHelper>
							<S.HeaderTitleHelper>
								Olá, <b>{formatText(contract[0]?.nmUsuarioC.split(' ')[0])}</b>.
								Como podemos ajudar?
							</S.HeaderTitleHelper>
							<S.ContainerSearchBar>
								<S.SearchBarHelper>
									<input
										type="text"
										value={wordEntered}
										onChange={handleFilter}
										placeholder={'Insira algumas palavras-chaves'}
									/>
								</S.SearchBarHelper>
								{filteredData.length !== 0 && (
									<S.FilterResult>
										{filteredData.slice(0, 15).map((value, key) => (
											<S.ItemResult key={key}>
												<p
													onClick={() => {
														setShow(false);
														setSelectedIndex(value.id);
														setSelectedCategory(value.title);
													}}>
													{value.text}
												</p>
											</S.ItemResult>
										))}
									</S.FilterResult>
								)}
							</S.ContainerSearchBar>
							<S.HeaderSubtitleHelper>
								Você também pode acessar os tópicos abaixo para encontrar o que está
								procurando.
							</S.HeaderSubtitleHelper>
						</S.HeaderContentHelper>
						<S.ContentRightIcon>
							<HelperIcon />
						</S.ContentRightIcon>
					</S.HeaderCardHelper>

					<S.ContainerCardsCategory>
						{categoryData.map((i, key) => (
							<CardCategory
								key={key}
								attributes={i.attributes}
								setSelectedCategory={setSelectedCategory}
							/>
						))}
					</S.ContainerCardsCategory>
				</>
			) : (
				<S.ContainerCategoryResult>
					<CardListCategories
						setShow={setShow}
						title={'Categorias'}
						setSelectedCategory={setSelectedCategory}
					/>

					<CardListResult
						show={show}
						setShow={setShow}
						data={filteredList}
						title={selectedCategory}
						selectedIndex={selectedIndex}
						setSelectedIndex={setSelectedIndex}
					/>
				</S.ContainerCategoryResult>
			)}

			<S.ContainerHelpChannels>
				<S.ContentHelpChannels>
					<S.TitleHelpChannels>Nossos canais de ajuda</S.TitleHelpChannels>
					<S.SubtitleHelpChannels>
						Você também pode acessar os tópicos abaixo para encontrar o que está
						procurando.
					</S.SubtitleHelpChannels>
				</S.ContentHelpChannels>
				<S.ContainerServiceChannel>
					{channelData.map((i, key) => (
						<CardServiceChannel key={key} attributes={i.attributes} />
					))}
				</S.ContainerServiceChannel>
			</S.ContainerHelpChannels>
		</>
	);
};
