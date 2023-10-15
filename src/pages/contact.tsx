import * as React from "react";
import { HeadFC, PageProps, graphql } from "gatsby";
import { Common } from "../components/common";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import { Html_Head } from "../components/html-head";

import Contact from "../components/contact";

const FormPage: React.FC<PageProps> = () => {
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
				<Contact />
			</GoogleReCaptchaProvider>
		</Common>
	);
};

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

export default FormPage;

export const Head: HeadFC = ({ data }: any) => (
	<Html_Head
		title={data.site.siteMetadata.title + " | お問い合わせ"}
		type="article"
		url={data.site.siteMetadata.siteUrl + "/contact"}
	></Html_Head>
);
