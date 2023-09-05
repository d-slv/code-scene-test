/* eslint-disable no-nested-ternary */
import React, {useEffect, useRef, useState} from 'react';
import {useRecoilState} from 'recoil';

// Util
import {formatText} from 'presentation/utils';

// Api
import {GetSpecialties} from 'domain/usecases/prescription-flow/specialties';
import {GetPrescriptions} from 'domain/usecases/prescription-flow/prescripition';

// Imagens
import prescriptionHeader from 'presentation/assets/images/prescriptionHeader.svg';
import filterWhite from 'presentation/assets/images/icon-filter-white.svg';
import filterOrange from 'presentation/assets/images/icon-filter-orange.svg';

// Componentes
import {CardMyPrescription} from 'presentation/components/card-my-prescription';
import {ButtonsScroll} from 'presentation/components/buttons-scroll';
import {HorizontalSroll} from 'presentation/components/horizontal-scroll';
import {Modal} from 'presentation/components/modal';
import {SelectField} from 'presentation/components/select-field';
import {Button} from 'presentation/components/button/button';

// Recoil - Gerenciador de Estado
import {downloadPDFPrescription} from 'presentation/pages/states/atoms';

import {DownloadPDFPrescription} from 'domain/usecases';
import * as S from './styles';

type Props = {
	specialties?: GetSpecialties;
	prescriptions?: GetPrescriptions;
	download?: DownloadPDFPrescription;
};

type DataPrescriptionsProps = {
	specialty: {
		name: string;
	};
	attendance_date?: string;
	raw_prescription: string;
	practitioner: {name: string};
	file_path: string;
	source: string;
};

export function PrescriptionPage({specialties, prescriptions, download}: Props) {
	// Modal
	const [isModalFilterOpen, setIsModalFilterOpen] = useState<boolean>(false);

	// Request
	const [dataSpecialties, setDataSpecialties] = useState([]);
	const [dataPrescriptions, setDataPrescriptions] = useState<DataPrescriptionsProps[]>([]);
	const [detail, setDetail] = useState('');

	// Selects
	const [InputPractitioner, setInputPractitioner] = useState('');
	const [selectSource, setSelectSource] = useState('');
	const [selectedSpecialtie, setSelectedSpecialtie] = useState('');
	const [selectedMonth, setSelectedMonth] = useState('');
	const [selectedYear, setSelectedYear] = useState('');

	// Filter
	const [filter, setFilter] = useState(false);

	// Botão Scroll
	const prescriptionRef = useRef(null);

	// Pagination
	const [total, setTotal] = useState<number>();
	const limit = 10;
	const [pages, setPages] = useState([]);
	const [page, setPage] = useState<number>();
	const [practitioner, setPractitioner] = useState('');
	const [source, setSource] = useState('');
	const [specialtySlug, setSpecialtySlug] = useState('');
	const [date, setDate] = useState('');

	// Validation
	const [validationMonth, setValidationMonth] = useState('');
	const [validationYear, setValidationYear] = useState('');

	// Loading
	const [loading, setLoading] = useState(false);

	// DownloadPDF
	const [downloadFile, setDownloadFile] = useRecoilState(downloadPDFPrescription);

	const requestPrescriptions = async (): Promise<void> => {
		await prescriptions
			.get({
				date,
				specialty_slug: specialtySlug,
				page,
				practitioner,
				source,
			})
			.then(data => {
				setDataPrescriptions(data.data);
				setDetail(data.detail);
				setTotal(data.total);
			});
		setLoading(false);
	};

	const requestSpecialties = async (): Promise<void> => {
		await specialties.getSpecialties().then(data => setDataSpecialties(data));
	};

	useEffect(() => {
		if (downloadFile) {
			download.downloadPDFPrescription().then(data => {
				const a = document.createElement('a');
				const url = window.URL.createObjectURL(data);
				a.href = url;
				a.download = 'receita';
				document.body.append(a);
				a.click();
				a.remove();
				window.URL.revokeObjectURL(url);
			});
		}
		setDownloadFile('');
	}, [downloadFile]);

	const downloadPDF = (pdf: string) => {
		setDownloadFile(pdf);
	};

	function Pages() {
		const totalPages = Math.ceil(total / limit);
		const arrayPages = [];

		// eslint-disable-next-line no-plusplus
		for (let i = 1; i <= totalPages; i++) {
			arrayPages.push(i);
		}

		setPages(arrayPages);
	}

	useEffect(() => {
		setLoading(true);
		requestSpecialties();
		requestPrescriptions();
	}, []);

	useEffect(() => {
		setLoading(true);
		Pages();
		requestPrescriptions();
	}, [limit, total, page, practitioner, source, specialtySlug, date]);

	const sources = [
		{value: '01', source: 'urgencia_geral', label: 'Consulta de Urgência'},
		{value: '02', source: 'eletiva', label: 'Consulta Eletiva'},
		{value: '03', source: 'teleconsulta_urgencia', label: 'Teleconsulta de Urgência'},
		{value: '04', source: 'teleconsulta_eletiva', label: 'Teleconsulta Eletiva'},
	];

	const months = [
		{value: '01', label: 'Janeiro'},
		{value: '02', label: 'Fevereiro'},
		{value: '03', label: 'Março'},
		{value: '04', label: 'Abril'},
		{value: '05', label: 'Maio'},
		{value: '06', label: 'Junho'},
		{value: '07', label: 'Julho'},
		{value: '08', label: 'Agosto'},
		{value: '09', label: 'Setembro'},
		{value: '10', label: 'Outubro'},
		{value: '11', label: 'Novembro'},
		{value: '12', label: 'Dezembro'},
	];

	const currentYear = new Date().getFullYear();

	const years = [];

	// eslint-disable-next-line no-plusplus
	for (let i = currentYear; i >= currentYear - 1; i--) {
		years.push({value: i});
	}

	function applyFilters() {
		setPage(1);
		if (selectedYear !== '' && selectedMonth === '') {
			setValidationMonth('Selecione um mês');
			return;
		}
		setValidationMonth('');

		if (selectedMonth !== '' && selectedYear === '') {
			setValidationYear('Selecione um ano');
			return;
		}
		setValidationYear('');

		setPractitioner(InputPractitioner);
		setSource(selectSource);
		setSpecialtySlug(selectedSpecialtie);
		setDate(
			selectedMonth !== '' && selectedYear !== '' ? `${selectedMonth}-${selectedYear}` : '',
		);

		setFilter(true);
		setIsModalFilterOpen(false);
	}

	function clearFilters() {
		requestPrescriptions();
		Array.from(document.querySelectorAll('select')).forEach(select => {
			// eslint-disable-next-line no-param-reassign
			select.value = '';
		});
		Array.from(document.querySelectorAll('input')).forEach(input => {
			// eslint-disable-next-line no-param-reassign
			input.value = '';
		});
		setFilter(false);
		setInputPractitioner('');
		setSelectSource('');
		setSelectedSpecialtie('');
		setSelectedMonth('');
		setSelectedYear('');
		setPractitioner('');
		setSource('');
		setSpecialtySlug('');
		setDate('');
		setValidationMonth('');
		setValidationYear('');
	}

	function CloseModal() {
		setIsModalFilterOpen(false);
		setValidationMonth('');
		setValidationYear('');
	}

	function itemSource(item: string) {
		switch (item) {
			case 'eletiva':
				return 'Consulta Eletiva';
			case 'urgencia_geral':
				return 'Consulta de Urgência';
			case 'teleconsulta_eletiva':
				return 'Teleconsulta Eletiva';
			case 'teleconsulta_urgencia':
				return 'Teleconsulta de Urgência';
			default:
				return formatText(item);
		}
	}

	return (
		<S.Container>
			<S.Header>
				<div className="image_and_text">
					<img src={prescriptionHeader} alt="Imagem receita Header" />
					<span>Receituário</span>
				</div>

				<div className="text_and_button">
					<h1>Minhas Receitas</h1>
					<div className="buttons_header">
						<S.ButtonFilter onClick={() => setIsModalFilterOpen(true)}>
							<span>Filtros</span>
							<img
								src={
									(practitioner || source || specialtySlug || date) && filter
										? filterOrange
										: filterWhite
								}
								alt="Filtro"
							/>
						</S.ButtonFilter>
					</div>
				</div>
			</S.Header>
			<S.Content>
				<S.ContainerCard>
					<h2>Consultas saúde</h2>
					<HorizontalSroll reference={prescriptionRef}>
						{dataPrescriptions.length === 0 && loading === false ? (
							<S.Detail>
								<p>{detail}</p>
								<div className="load">
									<Button onClick={() => requestPrescriptions()}>
										Recarregar Página
									</Button>
								</div>
							</S.Detail>
						) : (
							<S.ContentCard>
								{dataPrescriptions?.map(item => (
									<>
										<CardMyPrescription
											specialty={item.specialty.name}
											date_prescription={item.attendance_date}
											source={itemSource(item.source)}
											doctor={`Dr(a). ${item.practitioner.name}`}
											raw_prescription={item.raw_prescription}
											background="blue"
											borderColor="blue"
											filePath={item.file_path}
											download={() => downloadPDF(item.file_path)}
										/>
									</>
								))}
							</S.ContentCard>
						)}
					</HorizontalSroll>
				</S.ContainerCard>
				{dataPrescriptions.length !== 0 && (
					<S.ContentButtonsScroll>
						<ButtonsScroll reference={prescriptionRef}></ButtonsScroll>
					</S.ContentButtonsScroll>
				)}
			</S.Content>
			{dataPrescriptions.length !== 0 && (
				<S.Pagination>
					<div>Qtd {total}</div>
					<S.PaginationButton>
						{page > 1 && (
							<S.PaginationItem onClick={() => setPage(page - 1)}>
								Anterior
							</S.PaginationItem>
						)}

						{pages.map(item => (
							<S.PaginationItem
								isSelect={item === page}
								onClick={() => setPage(item)}
								key={item}>
								{item}
							</S.PaginationItem>
						))}
						{page < pages.length && (
							<S.PaginationItem onClick={() => setPage(page + 1)}>
								Próximo
							</S.PaginationItem>
						)}
					</S.PaginationButton>
				</S.Pagination>
			)}

			<Modal
				isOpen={isModalFilterOpen}
				title="Filtros de pesquisa"
				variant="default"
				style={{
					width: '40%',
				}}
				onClose={() => CloseModal()}>
				<S.ContainerSelect>
					<S.ContainerInputAndSelect>
						<div>
							<S.InputText
								placeholder="Nome do especialista"
								onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
									setInputPractitioner(e.target.value)
								}
							/>
						</div>
						<div>
							<p>Filtre por tipo</p>
							<SelectField
								fullWidth
								placeholder="Selecione..."
								onChange={e => setSelectSource(e)}>
								{sources?.map(item => (
									<option value={item.source} key={item.value}>
										{item.label}
									</option>
								))}
							</SelectField>
						</div>
						<div>
							<p>Filtre por especialidades</p>
							<SelectField
								fullWidth
								placeholder="Selecionar especialidade"
								onChange={e => setSelectedSpecialtie(e)}>
								{dataSpecialties?.map(item => (
									<option value={item.slug} key={item.id}>
										{formatText(item.name)}
									</option>
								))}
							</SelectField>
						</div>
					</S.ContainerInputAndSelect>
					<S.FilterMessageByDate>
						<p>Você também pode escolher uma data</p>
						<p>Para filtrar por data você tem que selecionar o mês e ano</p>
					</S.FilterMessageByDate>

					<S.ContainerSelectDate>
						<S.Month isMarginBottom={validationYear !== ''}>
							<SelectField
								size="lg"
								placeholder="Mês"
								onChange={e => setSelectedMonth(e)}>
								{months.map(month => (
									<option key={month.value} value={month.value}>
										{month.label}
									</option>
								))}
							</SelectField>
							<S.ValidationMonth>{validationMonth}</S.ValidationMonth>
						</S.Month>

						{
							<S.Separator
								isMarginBottom={validationMonth !== '' || validationYear !== ''}>
								E
							</S.Separator>
						}
						<S.Year isMarginBottom={validationMonth !== ''}>
							<SelectField
								size="lg"
								placeholder="Ano"
								onChange={e => setSelectedYear(e)}>
								{years.map(year => (
									<option key={year.value} value={year.value}>
										{year.value}
									</option>
								))}
							</SelectField>
							<S.ValidationYear>{validationYear}</S.ValidationYear>
						</S.Year>
					</S.ContainerSelectDate>
				</S.ContainerSelect>

				<S.ButtonFooterModal>
					<S.ButtonFilterLeftModal onClick={() => applyFilters()}>
						<span>Aplicar Filtros</span>
					</S.ButtonFilterLeftModal>
					<S.ButtonFilterRightModal onClick={() => clearFilters()}>
						<span>Limpar Filtros</span>
					</S.ButtonFilterRightModal>
				</S.ButtonFooterModal>
			</Modal>
		</S.Container>
	);
}
