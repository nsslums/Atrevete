import * as React from "react";
import { HeadFC, PageProps, graphql } from "gatsby";
import { Common } from "../components/common";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import { css } from "@emotion/react";
import { Html_Head } from "../components/html-head";
import EventForm from "../components/evebtForm";

const FormPage: React.FC<PageProps> = props => {
	const propsEvent = props.location.state?.event || "";
	return (
		<Common>
			<GoogleReCaptchaProvider
				reCaptchaKey={process.env.GATSBY_RECAPTCHA_SITEKEY as string}
				language="ja"
				scriptProps={{
					async: false, // optional, default to false,
					defer: true, // optional, default to false
					appendTo: "head", // optional, default to "head", can be "head" or "body",
					nonce: undefined, // optional, default undefined
				}}
			>
				<EventForm event={propsEvent} />
			</GoogleReCaptchaProvider>
		</Common>
	);
};

export default FormPage;

export const query = graphql`
	query {
		site {
			siteMetadata {
				title
				description
				siteUrl
				social {
					twitter
				}
			}
		}
	}
`;

export const Head: HeadFC = ({ data }: any) => (
	<Html_Head
		title={data.site.siteMetadata.title + " | イベント応募"}
		type="article"
		url={data.site.siteMetadata.siteUrl + "/eventForm"}
	></Html_Head>
);
