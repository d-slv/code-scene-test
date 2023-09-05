import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import styled from 'styled-components';
import {BalloonUtil} from './balloon-util';

const Container = styled.div`
	width: fit-content;
	background-color: ${props => props.theme.colors.white};
	padding: 2rem;
	display: grid;
	grid-template-columns: 1fr 1fr 1fr 1fr;
	gap: 1rem;
`;
export default {
	/* 👇 The title prop is optional.
	 * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
	 * to learn how to generate automatic titles
	 */
	title: 'COMPONENTS/Atoms/Balloon-util',
	component: BalloonUtil,
} as ComponentMeta<typeof BalloonUtil>;

export const Colors: ComponentStory<typeof BalloonUtil> = () => (
	<Container>
		<BalloonUtil>
			Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nesciunt, quas? Voluptate
			molestias eos laboriosam sint! Ipsa voluptatem, asperiores temporibus itaque dicta eum
			iure possimus repellendus perspiciatis neque, molestiae explicabo ex?
		</BalloonUtil>
		<BalloonUtil color="danger">
			Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nesciunt, quas? Voluptate
			molestias eos laboriosam sint! Ipsa voluptatem, asperiores temporibus itaque dicta eum
			iure possimus repellendus perspiciatis neque, molestiae explicabo ex?
		</BalloonUtil>
		<BalloonUtil color="primary">
			Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nesciunt, quas? Voluptate
			molestias eos laboriosam sint! Ipsa voluptatem, asperiores temporibus itaque dicta eum
			iure possimus repellendus perspiciatis neque, molestiae explicabo ex?
		</BalloonUtil>
		<BalloonUtil color="success">
			Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nesciunt, quas? Voluptate
			molestias eos laboriosam sint! Ipsa voluptatem, asperiores temporibus itaque dicta eum
			iure possimus repellendus perspiciatis neque, molestiae explicabo ex?
		</BalloonUtil>
	</Container>
);
