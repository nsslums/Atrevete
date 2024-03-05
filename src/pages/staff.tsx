import * as React from "react";
import { HeadFC, Link, PageProps, graphql } from "gatsby";
import { Common } from "../components/common";
import { css } from "@emotion/react";
import { Head1 } from "../stories/atrevete/Head1";
import { Html_Head } from "../components/html-head";
import PeopleProfile from "../stories/atrevete/peopleProfile";

const rootCss = css({
	display: "flex",
	maxWidth: "min(90vw, 990px)",
	flexDirection: "column",
	justifyContent: "center",
	margin: "auto",
	boxSizing: "border-box",
	alignItems: "center",
	position: "relative",
});

const staffsCss = css({
	display: "flex",
	boxSizing: "border-box",
	marginTop: "5em",
	flexWrap: "wrap",
	justifyContent: "center",
	alignItems: "stretch",
});

const StaffPage: React.FC<PageProps> = ({ data }: any) => {
	return (
		<Common>
			<div css={rootCss}>
				<Head1 text="Staff" />
				<div css={staffsCss}>
					{data.allContentfulStaff.nodes?.map((people: any) => {
						return (
							<div
								key={people.contentful_id}
								css={css({
									position: "relative",
								})}
							>
								<PeopleProfile
									name={people.name}
									nameSub={people.nameSub}
									image={people.avatar?.gatsbyImageData}
									profile={people.description}
									isStaff={people.profileType}
								/>
							</div>
						);
					})}
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
		allContentfulStaff: allContentfulPeople(
			filter: { profileType: { eq: true }, hidden: { ne: true } }
		) {
			nodes {
				contentful_id
				name
				nameSub
				description {
					raw
				}
				profileType
				avatar {
					gatsbyImageData
				}
			}
		}
	}
`;

export default StaffPage;

export const Head: HeadFC = ({ data }: any) => (
	<Html_Head
		title={data.site.siteMetadata.title + " | スタッフ"}
		type="article"
		url={data.site.siteMetadata.siteUrl + "/staff"}
	></Html_Head>
);
