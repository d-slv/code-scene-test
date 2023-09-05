import React, {useState} from 'react';
import {Button} from 'presentation/components/button/button';
import {StarIcon} from 'presentation/components/icons/star-icon';
import {Modal} from 'presentation/components/modal';
import useWindowDimensions from 'presentation/hooks/useWindowDimensions';
import {
	Comment,
	ContainerButtonCheckBox,
	ContainerInfoMotivadores,
	ContainerStar,
	DateDoctor,
	Divider,
	DoneContent,
	IconDone,
	Info,
	InputCheck,
	ModalContent,
	ModalTitle,
	StarsContent,
	Text,
	TextReview,
} from './five-star.styles';
import {ButtonCheckBoxProps, FiveStarProps} from './five-star.types';

interface StarRatingProps {
	key: number;
	index: number;
	rating: number;
	hoverRating?: number;
	onMouseEnter?: (index: number) => void;
	onMouseLeave?: () => void;
	onSaveRating?: (index: number) => void;
}

const StarRating: React.FC<StarRatingProps> = props => {
	const {index, rating, hoverRating, onMouseEnter, onMouseLeave, onSaveRating} = props;
	const fill = React.useMemo(() => {
		if (hoverRating >= index) {
			return '#F5AB1F';
		}
		if (!hoverRating && rating >= index) {
			return '#F5AB1F';
		}
		return 'none';
	}, [rating, hoverRating, index]);
	return (
		<ContainerStar
			onMouseEnter={() => onMouseEnter(index)}
			onMouseLeave={() => onMouseLeave()}
			onClick={() => onSaveRating(index)}>
			<StarIcon fill={fill} />
		</ContainerStar>
	);
};

const ButtonCheckBox: React.FC<ButtonCheckBoxProps> = ({
	isChecked = false,
	isDisable,
	resume,
	children,
	onChange,
	onSelectedItem,
}) => {
	const [checked, setChecked] = useState(isChecked);

	function HandleChange(value: boolean) {
		setChecked(value);
	}

	return (
		<ContainerButtonCheckBox
			onClick={() => {
				HandleChange(!checked);
				onSelectedItem(children);
			}}
			checked={checked}>
			<InputCheck
				type="checkbox"
				checked={checked}
				disabled={isDisable}
				onChange={onChange}
			/>
			<span>
				{children}
				<p>{resume}</p>
			</span>
		</ContainerButtonCheckBox>
	);
};

export function FiveStar({
	answers,
	showModal,
	setHideCard,
	setShowModal,
	questions,
}: FiveStarProps) {
	const [rating, setRating] = useState(0);
	const [isLoading, setIsLoading] = useState(false);
	const [hoverRating, setHoverRating] = useState(0);
	const [commentText, setCommentText] = useState('');
	const [optionsSelected, setOptionsSelected] = useState([]);
	const [isModalStep2_Open, setIsModalStep2_Open] = useState(false);
	const [isModalStep3_Open, setIsModalStep3_Open] = useState(false);
	const [isModalStep4_Open, setIsModalStep4_Open] = useState(false);

	const destructuringObj = {...questions};
	const questionResult = destructuringObj[0];

	const newMotivatorsObject = [];
	const filterById = optionsSelected.map(e => JSON.stringify(e.id));
	filterById.forEach(newId => newMotivatorsObject.push(`${newId}`));

	const formattedMotivators = `{"motivadores": [${newMotivatorsObject}]}`;

	const confirmAvaliation = async (): Promise<void> => {
		setIsLoading(true);
		try {
			await answers.post({
				items: [
					{
						nota: rating,
						comentario: commentText,
						tipo: questionResult?.tipo,
						motivadores: formattedMotivators,
						email: questionResult?.email,
						cdatendimento: questionResult?.cdatendimento,
					},
				],
			});
		} catch {
			setIsLoading(false);
		} finally {
			setIsLoading(false);
			setIsModalStep4_Open(true);
			setIsModalStep3_Open(false);
		}
	};

	const onMouseEnter = index => {
		setHoverRating(index);
	};

	const onMouseLeave = () => {
		setHoverRating(0);
	};

	const onSaveRating = index => {
		setRating(index);
	};

	const goToStep2 = () => {
		setIsModalStep2_Open(true);
		setShowModal(false);
	};

	const goToStep3 = () => {
		setIsModalStep3_Open(true);
		setIsModalStep2_Open(false);
	};

	function handleSelectOption(item) {
		const option = {
			id: item.id,
			titulo: item.titulo,
			descricao: item.descricao,
		};
		const find = optionsSelected.find(opt => opt.id === item.id);
		if (find) {
			const index = optionsSelected.indexOf(find);
			optionsSelected.splice(index, 1);
			setOptionsSelected([...optionsSelected]);
		} else {
			setOptionsSelected([...optionsSelected, option]);
		}
	}

	const {width} = useWindowDimensions();
	const isResponsive = width < 640;
	const responsive = isResponsive ? {width: '90%'} : {width: '35%'};

	return (
		<>
			{/* Step 1 */}
			<Modal
				variant="other"
				isOpen={showModal}
				style={responsive}
				onClose={() => {
					setShowModal(!showModal);
				}}>
				<ModalContent>
					<ModalTitle>Como foi seu último atendimento?</ModalTitle>
					<Info>{questionResult?.info.titulo}</Info>
					<Divider />
					<TextReview>Sua avaliação geral:</TextReview>
					<StarsContent>
						{[1, 2, 3, 4, 5].map(index => (
							<StarRating
								key={index}
								index={index}
								rating={rating}
								hoverRating={hoverRating}
								onMouseEnter={onMouseEnter}
								onMouseLeave={onMouseLeave}
								onSaveRating={onSaveRating}
							/>
						))}
					</StarsContent>
					<Divider />
					<Button
						fullWidth
						fontSize={'xs'}
						disabled={rating === 0}
						spacingInsetY={'xs'}
						onClick={() => {
							goToStep2();
						}}
						style={{height: '2.813rem'}}>
						AVALIAR
					</Button>
				</ModalContent>
			</Modal>

			{/* Step 2 */}
			<Modal
				variant="other"
				isOpen={isModalStep2_Open}
				style={responsive}
				onClose={() => {
					setIsModalStep2_Open(!isModalStep2_Open);
				}}>
				<DateDoctor>{questionResult?.info.especialidade}</DateDoctor>
				<StarsContent>
					{[1, 2, 3, 4, 5].map(index => (
						<StarRating key={index} index={index} rating={rating} />
					))}
				</StarsContent>
				<Text>
					<strong>O que mais você gostou?</strong>
					<br />
					{`Escolha até ${questionResult?.qtdrespmotivadores} opções:`}
				</Text>
				{questionResult?.motivadores.map((item, index) => (
					<ButtonCheckBox
						key={index}
						resume={item.descricao}
						onSelectedItem={() => handleSelectOption(item)}>
						{item.titulo}
					</ButtonCheckBox>
				))}
				<Button
					fullWidth
					fontSize={'xs'}
					disabled={optionsSelected.length > Number(questionResult?.qtdrespmotivadores)}
					spacingInsetY={'xs'}
					onClick={() => {
						goToStep3();
					}}
					style={{height: '2.813rem', marginTop: '0.75rem'}}>
					CONTINUAR
				</Button>
			</Modal>

			{/* Step 3 */}
			<Modal
				variant="other"
				isOpen={isModalStep3_Open}
				style={responsive}
				onClose={() => {
					setCommentText('');
					setIsModalStep3_Open(!isModalStep3_Open);
				}}>
				<DateDoctor>{questionResult?.info.especialidade}</DateDoctor>
				<StarsContent>
					{[1, 2, 3, 4, 5].map(index => (
						<StarRating key={index} index={index} rating={rating} />
					))}
				</StarsContent>
				<Text>
					<strong>Você pode dar mais detalhes</strong>
					<br />
					<strong>do atendimento</strong>
				</Text>
				{optionsSelected.map((item, index) => (
					<ContainerInfoMotivadores key={index}>
						<span>
							{item.titulo}
							<p>{item.descricao}</p>
						</span>
					</ContainerInfoMotivadores>
				))}
				<Comment
					rows={10}
					onChange={e => setCommentText(e.target.value)}
					placeholder="Forneça o máximo de detalhes para que a gente possa te ajudar o mais rápido possível!"></Comment>
				<Button
					fullWidth
					isLoading={isLoading}
					fontSize={'xs'}
					spacingInsetY={'xs'}
					onClick={() => {
						confirmAvaliation();
					}}
					style={{height: '2.813rem', marginTop: '1.5rem'}}>
					ENVIAR AGORA
				</Button>
			</Modal>

			{/* Step 4 */}
			<Modal
				variant="other"
				isOpen={isModalStep4_Open}
				style={responsive}
				onClose={() => {
					setCommentText('');
					setIsModalStep4_Open(!isModalStep4_Open);
				}}>
				<ModalTitle>Avaliação de Atendimento</ModalTitle>
				<DoneContent>
					<IconDone />
				</DoneContent>
				<ModalTitle>
					Obrigado pela
					<br />
					participação!
				</ModalTitle>
				<Button
					fullWidth
					fontSize={'xs'}
					spacingInsetY={'xs'}
					onClick={() => {
						setRating(0);
						setHideCard(true);
						setCommentText('');
						setOptionsSelected([]);
						setIsModalStep4_Open(!isModalStep4_Open);
					}}
					style={{height: '2.813rem', marginTop: '1.5rem'}}>
					CONCLUIR
				</Button>
			</Modal>
		</>
	);
}
