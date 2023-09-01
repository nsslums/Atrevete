import * as React from "react";
import { Link, HeadFC, PageProps, graphql, navigate } from "gatsby";
import { Common } from "../components/common";
import { Html_Head } from "../components/html-head";
import { css } from "@emotion/react";
import { SimpleButton } from "../stories/atrevete/SimpleButton";

const rootCss = css({
	display: "flex",
	justifyContent: "center",
	alignItems: "center",
	height: "calc(100vh - 196px)",
});

const textCss = css({
	fontSize: 32,
	textAlign: "center",
	letterSpacing: ".05em",
	lineHeight: 2,
});

const buttonCss = css({
	display: "flex",
	justifyContent: "center",
	alignItems: "center",
	marginTop: "3em",
});

const ThanksPage: React.FC<PageProps> = () => {
	return (
		<Common>
			<div css={rootCss}>
				<div>
					<p css={textCss}>
						メールにご入力いただいた内容を
						<br />
						お送りいたしましたのでご確認お願い致します
					</p>
					<div css={buttonCss}>
						<SimpleButton
							text="HOME"
							onClick={async (e: any) => await navigate("/")}
						/>
					</div>
				</div>
			</div>
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

export default ThanksPage;

export const Head: HeadFC = ({ data }: any) => (
	<Html_Head
		title={data.site.siteMetadata.title + " | Thanks"}
		type="article"
		url={data.site.siteMetadata.siteUrl + "/thanks"}
	></Html_Head>
);
