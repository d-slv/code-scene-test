export type TextProps = {
	text: string;
	color?: string;
};

export type HeaderProps = {
	columns: TextProps[];
	background?: {
		color?: string;
	};
};

export type BodyProps = {
	rows: TextProps[][];
	background?: {
		color?: string;
		stripe?: boolean;
		stripeColor?: string;
	};
};

export type TableProps = {
	header: HeaderProps;
	body: BodyProps;
};
