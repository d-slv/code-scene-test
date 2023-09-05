import {Button} from 'presentation/components/button/button';
import {Modal} from 'presentation/components/modal';
import {TextField} from 'presentation/components/text-field';
import {
	healthBookingStates,
	signUpStates,
	telehealthBookingStates,
} from 'presentation/pages/states/atoms';
import {checkMasks, formatMasks} from 'presentation/utils';
import React, {useState} from 'react';
import {useRecoilState} from 'recoil';
import {
	Component,
	Container,
	ContainerModal,
	ContainerRadio,
	FormContainer,
	IconAlert,
	IconCellPhone,
	IconPhone,
	IconPlusCircle,
	InputRadio,
	LineSeparator,
	ListPhones,
	Message,
	NumberContainerModal,
	NumberReview,
	Separador,
	Text,
	Title,
} from './update-phones.styles';
import {RadioButtonProps, UpdatePhonesProps} from './update-phones.types';

export const RadioButton: React.FC<RadioButtonProps> = ({
	name,
	value,
	checked,
	onClick,
	children,
}) => (
	<ContainerRadio>
		<InputRadio name={name} value={value} checked={checked} onClick={onClick} />
		<IconPhone />
		{children}
	</ContainerRadio>
);

export function UpdatePhone({phones = [], isTelemedicine = false}: UpdatePhonesProps) {
	const [numbers, setNumber] = useState(phones);
	const [value, setValue] = useState('');
	const [phone, setPhone] = useState('');
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [telehealthBooking, setTelehealthBooking] = useRecoilState(telehealthBookingStates);
	const [healthBooking, setHealthBooking] = useRecoilState(healthBookingStates);
	const [state, setState] = useRecoilState(signUpStates);

	function addNumber() {
		const number = phone;
		setNumber([...numbers, number]);
		setValue('');
		setIsModalOpen(false);
	}

	const goToAddNumber = () => {
		setIsModalOpen(true);
		setPhone(value);
	};

	function checkPhone() {
		if (state.phone !== '') {
			const ck = !checkMasks('phone', state.phone);
			setState({
				...state,
				isInvalid: ck,
				phoneInvalidMsg: ck ? 'Número inválido!' : '',
			});
		}
	}

	const handlePhoneSelected = (n: string) => {
		if (isTelemedicine) {
			setTelehealthBooking({...telehealthBooking, nuTelefone: n});
		} else {
			setHealthBooking({...healthBooking, nuTelefone: n});
		}
	};

	return (
		<Component>
			<Title>Confirme seu celular.</Title>
			<Message>
				Vamos enviar apenas informações sobre o seu atendimento, por exemplo: lembretes,
				atestados ou prescrições.
			</Message>
			<Container>
				<ListPhones>
					{numbers
						.map((item, index) => (
							<RadioButton
								key={index}
								name="phone"
								value={item}
								onClick={() => handlePhoneSelected(item)}>
								{formatMasks('phone', item)}
							</RadioButton>
						))
						.sort((a, b) => (a.key < b.key ? 1 : -1))}
				</ListPhones>
				<Separador>
					<LineSeparator />
					<p>ou</p>
					<LineSeparator />
				</Separador>
				<FormContainer>
					<p>
						<strong>Adicione ou insira</strong> um número diferente:
					</p>
					<TextField
						borderRadius="nano"
						maxLength={15}
						value={state.phone}
						placeholder="(00) 00000-0000"
						onChange={event =>
							setState({
								...state,
								phone: formatMasks('phone', event.target.value),
								isInvalid: false,
								phoneInvalidMsg: '',
							})
						}
						isInvalid={state.isInvalid}
						invalidMessage={state.phoneInvalidMsg}
						onBlur={checkPhone}
						onMouseLeave={() => {
							checkPhone();
						}}
					/>
					<Button
						disabled={state.phone.length < 15 || state.isInvalid}
						rightIcon={<IconPlusCircle />}
						fullWidth={true}
						onClick={() => {
							goToAddNumber();
						}}>
						Adicionar número
					</Button>
				</FormContainer>
			</Container>

			<Modal
				isOpen={isModalOpen}
				style={{width: '25%'}}
				onClose={() => {
					setIsModalOpen(!isModalOpen);
				}}>
				<ContainerModal>
					<IconAlert />
					<Text>Você adicionou um número:</Text>
					<NumberContainerModal>
						<IconCellPhone />
						<NumberReview>{formatMasks('phone', state.phone)}</NumberReview>
					</NumberContainerModal>
					<Button
						style={{width: '12.5rem', height: '3rem'}}
						fullWidth={true}
						fontSize={'xs'}
						fontWeight={'regular'}
						onClick={() => addNumber()}>
						Confirmar número
					</Button>
					<Button
						style={{width: '12.5rem', height: '3rem', marginBottom: '2.125rem'}}
						fullWidth={true}
						fontSize={'xs'}
						fontWeight={'regular'}
						variant={'outlined'}
						onClick={() => {
							setIsModalOpen(!isModalOpen);
						}}>
						Alterar número
					</Button>
				</ContainerModal>
			</Modal>
		</Component>
	);
}
