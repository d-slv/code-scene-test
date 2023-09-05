import {createGlobalStyle} from 'styled-components';

export default createGlobalStyle`
	* {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}

	html {
		font-size: 16px;

		@media(max-width: 576px) {
      font-size: 87.5%;
		}
	}

	body {
		background: ${props => props.theme.colors.background};
		color: ${props => props.theme.colors['primaryBlue.500']};
	}

	button {
		cursor: pointer;
	}

	ul {
		list-style: none;
	}

	a{
		text-decoration: none;
	}

	body,
	button,
	input,
	textarea {
		font: 400 1rem "Source Sans Pro", sans-serif;
		font-family: 'Source Sans Pro', sans-serif;
	}

	h1, h2, h3,
	h4, h5, h6,
	strong {
		font-weight: 600;
	}

	.ReactModal__Overlay {
    z-index:9999;
  }

  .otnotice-content{
		overflow-y: auto ;
		max-height: 584px;
	}

	.ReactModal__Content{
		@media screen and (max-width: 1024px) {
			width: 80% !important;
		}

		@media screen and (max-width: 580px) {
			width: 90% !important;
		}
	}
`;
