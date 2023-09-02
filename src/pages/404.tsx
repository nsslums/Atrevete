import * as React from "react";
import { HeadFC, PageProps, graphql } from "gatsby";
import { Common } from "../components/common";
import { css } from "@emotion/react";
import { Html_Head } from "../components/html-head";
import facepaint from "facepaint";

const breakpoints = [520, 767, 1100];
const mq = facepaint(breakpoints.map(bp => `@media (min-width: ${bp}px)`));

const imageStyle = css({
	width: "350px",
});

const pStyle = css({
	textAlign: "center",
	marginTop: "20px",
	fontSize: "1.5rem",
});
const NotFoundPage: React.FC<PageProps> = () => {
	return (
		<Common>
			<div
				css={{
					height: "calc(100vh - 400px)",
					display: "grid",
					placeItems: "center",
				}}
			>
				<div>
					<img
						src="/404.svg"
						alt="404img"
						css={imageStyle}
					/>
					<p css={pStyle}>このページは存在しません</p>
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

export default NotFoundPage;

export const Head: HeadFC = ({ data }) => (
	<Html_Head
		title={data.site.siteMetadata.title + " | 404 Not Found"}
		type="article"
		url={data.site.siteMetadata.siteUrl + "/404"}
	></Html_Head>
);
