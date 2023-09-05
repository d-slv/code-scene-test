import React, {useState} from 'react';
import {MdVisibility, MdVisibilityOff} from 'react-icons/md';
import amplitude from 'amplitude-js';
import TagManager from 'react-gtm-module';
import {
	Container,
	InputContainer,
	InputField,
	InputTokenField,
	InputIcon,
	InvalidMenssage,
	Label,
} from './text-field.styles';
import {TextFieldProps} from './text-field.types';

export function TextField({
	label,
	id,
	invalidMessage,
	isInvalid,
	centralizedMessage = false,
	fontSize = 'xs',
	fontWeight = 'medium',
	borderRadius = 'md',
	borderWidth = 'hairline',
	spacingInset = 'nano',
	spacingInsetY = 'nano',
	spacingInsetX = 'sm',
	...rest
}: TextFieldProps) {
	return (
		<Container>
			<Label htmlFor={id}>{label}</Label>
			<InputContainer>
				<InputField
					fontSize={fontSize}
					fontWeight={fontWeight}
					borderRadius={borderRadius}
					borderWidth={borderWidth}
					spacingInset={spacingInset}
					spacingInsetY={spacingInsetY}
					spacingInsetX={spacingInsetX}
					isInvalid={isInvalid}
					name={id}
					id={id}
					{...rest}
				/>
			</InputContainer>
			{isInvalid && (
				<InvalidMenssage className={centralizedMessage === true ? 'actived' : ''}>
					<p>{invalidMessage}</p>
				</InvalidMenssage>
			)}
		</Container>
	);
}

export function PasswordField({
	label,
	id,
	invalidMessage,
	isInvalid,
	fontSize = 'xs',
	fontWeight = 'medium',
	borderRadius = 'md',
	borderWidth = 'hairline',
	spacingInset = 'nano',
	spacingInsetY = 'nano',
	spacingInsetRight = 'lg',
	spacingInsetX = 'sm',
	...rest
}: TextFieldProps) {
	const [isVisibility, setIsVisibility] = useState(false);
	return (
		<Container>
			<Label htmlFor={id}>{label}</Label>
			<InputContainer>
				<InputField
					type={isVisibility ? 'text' : 'password'}
					fontSize={fontSize}
					fontWeight={fontWeight}
					borderRadius={borderRadius}
					spacingInsetRight={spacingInsetRight}
					borderWidth={borderWidth}
					spacingInset={spacingInset}
					spacingInsetY={spacingInsetY}
					spacingInsetX={spacingInsetX}
					isInvalid={isInvalid}
					name={id}
					id={id}
					{...rest}
				/>
				<InputIcon
					type="button"
					onClick={() => {
						const tagManagerArgs = {
							gtmId: 'GTM-KQKN552',
							events: {
								sendUserInfo: 'Ver senha',
							},
						};

						TagManager.initialize(tagManagerArgs);
						amplitude.getInstance().logEvent('Ver senha');
						setIsVisibility(!isVisibility);
					}}
					isInvalid={isInvalid}>
					{isVisibility ? <MdVisibilityOff /> : <MdVisibility />}
				</InputIcon>
			</InputContainer>
			{isInvalid && (
				<InvalidMenssage>
					<p>{invalidMessage}</p>
				</InvalidMenssage>
			)}
		</Container>
	);
}

export function TokenField({label, id, invalidMessage, isInvalid, ...rest}: TextFieldProps) {
	return (
		<Container>
			<Label htmlFor={id}>{label}</Label>
			<InputContainer>
				<InputTokenField type="tel" isInvalid={isInvalid} name={id} id={id} {...rest} />
			</InputContainer>
			{isInvalid && (
				<InvalidMenssage>
					<p style={{marginLeft: '0.25rem'}}>{invalidMessage}</p>
				</InvalidMenssage>
			)}
		</Container>
	);
}
