import * as React from "react";
import { HeadFC, PageProps, graphql } from "gatsby";
import { Common } from "../components/common";
import { EventCard } from "../stories/atrevete/event/EventCard";
import { css } from "@emotion/react";
import { Head1 } from "../stories/atrevete/Head1";
import { Html_Head } from "../components/html-head";
import { GetSlug } from "../api/getSlug";

const rootCss = css({
	display: "flex",
	width: 990,
	flexDirection: "column",
	justifyContent: "center",
	margin: "auto",
	boxSizing: "border-box",
	alignItems: "center",
});

const eventsCss = css({
	display: "flex",
	boxSizing: "border-box",
	marginTop: "5em",
	flexWrap: "wrap",
	justifyContent: "center",
	alignItems: "center",
});

const eventCss = css({
	margin: "1em 1em",
});

const EventPage: React.FC<PageProps> = ({ data }: any) => {
	const events = data.allContentfulEvent.nodes;

	return (
		<Common>
			<div css={rootCss}>
				<Head1 text="イベント" />
				<div css={eventsCss}>
					{events?.map(
						(event: {
							contentful_id: React.Key | null | undefined;
							title: string;
							date: string;
							slug: string;
						}) => (
							<div
								key={event.contentful_id}
								css={eventCss}
							>
								<EventCard
									title={event.title}
									url={"/event/" + GetSlug(event)}
									date={event.date}
								/>
							</div>
						),
					)}
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
		allContentfulEvent(filter: { hidden: { ne: true } }) {
			nodes {
				date(formatString: "yyyy/M/D")
				title
				contentful_id
				slug
			}
		}
	}
`;

export default EventPage;

export const Head: HeadFC = ({ data }: any) => (
	<Html_Head
		title={data.site.siteMetadata.title + " | イベント"}
		type="article"
		url={data.site.siteMetadata.siteUrl + "/event"}
	></Html_Head>
);
