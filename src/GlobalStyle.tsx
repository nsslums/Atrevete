import { Global, css } from "@emotion/react";

const GlobalStyle = () => (
	<Global
		styles={css`
			html,
			body,
			div,
			span,
			object,
			iframe,
			h1,
			h2,
			h3,
			h4,
			h5,
			h6,
			p,
			blockquote,
			pre,
			abbr,
			address,
			cite,
			code,
			del,
			dfn,
			em,
			img,
			ins,
			kbd,
			q,
			samp,
			small,
			strong,
			sub,
			sup,
			var,
			b,
			i,
			dl,
			dt,
			dd,
			ol,
			ul,
			li,
			fieldset,
			form,
			label,
			legend,
			table,
			caption,
			tbody,
			tfoot,
			thead,
			tr,
			th,
			td,
			article,
			aside,
			canvas,
			details,
			figcaption,
			figure,
			footer,
			header,
			hgroup,
			menu,
			nav,
			section,
			summary,
			time,
			mark,
			audio,
			video {
				padding: 0;
				border: 0;
				margin: 0;
				background: transparent;
				font-size: 100%;
				outline: 0;
				vertical-align: baseline;
			}

			article,
			aside,
			details,
			figcaption,
			figure,
			footer,
			header,
			hgroup,
			menu,
			nav,
			section {
				display: block;
			}

			a {
				color: inherit;
				outline: none;
				text-decoration: none;
			}

			a:visited {
				border: none;
			}

			/* Form Style Reset */
			input,
			button,
			select,
			textarea {
				border: none;
				border-radius: 0;
				appearance: none;
				background: transparent;
				color: white;
				font: inherit;
				outline: none;
			}

			textarea {
				resize: none;
			}

			input[type="checkbox"],
			input[type="radio"] {
				display: none;
			}

			input[type="date"] {
				position: relative;
			}

			input[type="date"]::-webkit-calendar-picker-indicator {
				position: absolute;
				width: 100%;
				height: 100%;
				opacity: 0;
			}

			input[type="submit"],
			input[type="button"],
			label,
			button,
			select {
				cursor: pointer;
			}

			select::-ms-expand {
				display: none;
			}

			input:-webkit-autofill {
				box-shadow: 0 0 0 1000px #fff inset;
			}

			input[type="number"] {
				appearance: textfield;
			}

			input[type="number"]::-webkit-outer-spin-button,
			input[type="number"]::-webkit-inner-spin-button {
				margin: 0;
				appearance: none;
			}

			/* Atrevete Style */

			html {
				width: 100%;
				height: 100%;
			}

			body {
				position: relative;
				width: 100%;
				height: 100%;
				background-color: #121212;
				color: white;
				font-display: swap;
				font-family: "Zen Kaku Gothic New", sans-serif;

				/* font-family: 'Zen Old Mincho', serif; */
				&::before {
					position: fixed;
					top: 0;
					left: 0;
					width: 100%;
					height: 100%;
					background-blend-mode: color-dodge;
					background-image: url("/noise.webp");
					background-repeat: "repeat";
					background-size: 40%;
					content: "";
					opacity: 0.03;
				}
			}

			.bg_noise {
				position: relative;

				&::after {
					position: absolute;
					top: 0;
					left: 0;
					width: 100%;
					height: 100%;
					background-blend-mode: color-dodge;
					background-image: url("/noise.webp");
					background-repeat: "repeat";
					background-size: 40%;
					content: "";
					opacity: 0.2;
				}
			}

			#___gatsby,
			#storybook-root {
				position: relative;
				z-index: 10;
			}

			.grecaptcha-badge {
				z-index: 1000000;
				visibility: hidden;
			}

			.ReactModal__Overlay {
				z-index: 100;
				backdrop-filter: blur(2px);
				background-color: rgb(0 0 0 / 50%) !important;
			}

			:root {
				--gold-gradient: linear-gradient(20deg, #ccb37e, #7e4d16);
			}

			::-webkit-scrollbar {
				width: 5px;
				height: 5px;
				background: rgb(255 255 255 / 0%);
			}

			::-webkit-scrollbar-thumb {
				border-radius: 5px;
				background-color: #3e3e3e;
			}

			::-webkit-scrollbar-thumb:hover {
				background-color: #5f5f5f;
			}
		`}
	/>
);
export default GlobalStyle;
