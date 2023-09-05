import styled from 'styled-components';
import theme from 'presentation/styles/theme.styles';
import search from 'presentation/assets/images/search.png';

export const HeaderCardHelper = styled.div`
	width: 100%;
	height: 180px;
	background: #e8f2ff;
	border-radius: 11px;
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	padding: 20px 0 18px 0;

	@media (max-width: 820px) {
		grid-template-columns: 1fr;
	}
`;

export const HeaderContentHelper = styled.div`
	display: grid;
	grid-column: 2;
	text-align: center;

	@media (max-width: 820px) {
		grid-column: 1;
	}
`;

export const HeaderTitleHelper = styled.h2`
	font-weight: 600;
	font-size: 26px;
	line-height: 33px;

	@media (max-width: 820px) {
		font-size: 16px;
		line-height: 17px;
	}
`;

export const ContainerSearchBar = styled.div`
	display: flex;
	flex-direction: column;
`;

export const SearchBarHelper = styled.div`
	width: 36rem;
	height: 2.688rem;
	font-size: 1.125rem;
	line-height: normal;
	border-radius: 1.406rem;
	background: white;
	padding-left: 22px;
	color: ${theme.colors['gray.3']};

	display: flex;
	align-items: center;
	position: relative;
	overflow: hidden;

	input {
		position: static;
		height: 100%;
		width: 100%;
		border: none;
		outline: none;
		border-radius: 0.625rem;
		-webkit-box-sizing: border-box; /* Safari/Chrome, other WebKit */
		-moz-box-sizing: border-box; /* Firefox, other Gecko */
		box-sizing: border-box; /* Opera/IE 8+ */
		padding-left: 25px;
		background: url(${search}) no-repeat left;
		background-size: 17px;

		::placeholder {
			@media (max-width: 820px) {
				font-size: 12px;
				line-height: 15px;
			}
		}

		@media (max-width: 820px) {
			background-size: 10px;
		}
	}

	@media (max-width: 820px) {
		width: auto;
		height: 2.375rem;
		font-size: 0.75rem;
		line-height: 0.938rem;
		margin: 1rem;
	}
`;

export const FilterResult = styled.div`
	margin-top: 5px;
	z-index: 999999;
	width: auto;
	height: auto;
	padding: 9px;
	border-radius: 17px;
	background-color: white;
	box-shadow: rgba(0, 0, 0, 0.07) 0px 9px 21px;
	overflow: hidden;
	overflow-y: auto;

	::-webkit-scrollbar {
		display: none;
	}
`;

export const ItemResult = styled.div`
	width: 100%;
	height: 50px;
	display: flex;
	cursor: pointer;
	align-items: center;
	font-weight: 500;
	font-size: 15px;
	line-height: 18px;
	padding: 13px 0 13px 13px;

	:hover {
		background: #f1f1f1;
		border-radius: 17px;
	}

	p {
		margin-left: 10px;
	}
`;

export const HeaderSubtitleHelper = styled.p`
	font-size: 16px;
	line-height: 20px;

	@media (max-width: 820px) {
		width: 80%;
		justify-self: center;
		font-size: 11px;
		line-height: 14px;
	}
`;

export const ContentRightIcon = styled.div`
	padding: 0 13px 0 18px;

	@media (max-width: 1280px) {
		svg {
			display: none;
		}
	}
`;

export const ContainerCardsCategory = styled.div`
	display: grid;
	width: 100%;
	padding: 30px 0px 55px 0px;
	grid-template-columns: repeat(4, 1fr);
	column-gap: 1.875rem;
	row-gap: 1.25rem;

	@media (max-width: 820px) {
		grid-template-columns: 1fr;
		column-gap: 0;
		row-gap: 1px;
		padding: 13px 0px 40px 0px;
	}
`;

export const ContainerHelpChannels = styled.div`
	width: 100%;
	border-top: 1px solid ${theme.colors['gray.2']};
`;

export const ContentHelpChannels = styled.div`
	padding: 27.5px 0 32px 0;
	text-align: center;
`;

export const TitleHelpChannels = styled.h2`
	font-weight: 600;
	font-size: 28px;
	line-height: 35px;
	padding-bottom: 7px;

	@media (max-width: 820px) {
		font-size: 16px;
		line-height: 20px;
	}
`;

export const SubtitleHelpChannels = styled.p`
	font-size: 16px;
	line-height: 20px;
	color: ${theme.colors['gray.4']};

	@media (max-width: 820px) {
		font-size: 12px;
		line-height: 14px;
	}
`;

export const ContainerServiceChannel = styled.div`
	display: grid;
	width: 100%;
	grid-template-columns: repeat(3, 1fr);
	column-gap: 1.875rem;

	@media (max-width: 820px) {
		grid-template-columns: 1fr;
		column-gap: 0;
		row-gap: 1px;
	}
`;

export const ContainerCategoryResult = styled.div`
	display: grid;
	width: 100%;
	grid-template-columns: 0.4fr 2fr;
	column-gap: 30px;
	padding-bottom: 55px;

	@media (max-width: 820px) {
		padding-bottom: 40px;
		grid-template-columns: 1fr;
	}
`;
