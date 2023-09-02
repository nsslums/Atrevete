import * as React from "react";
import { HeadFC, PageProps, graphql, navigate } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
import { Events } from "../components/eventSlide";
import { Posts } from "../components/postSlide";
import { Common } from "../components/common";
import { GoldButton } from "../stories/atrevete/GoldButton";
import { css } from "@emotion/react";
import { Head1 } from "../stories/atrevete/Head1";
import { PostCard } from "../stories/atrevete/event/PostCard";
import { Html_Head } from "../components/html-head";
import facepaint from "facepaint";
import { motion } from "framer-motion";
import logo from "../../static/Atrevete.svg";
import PeopleProfile from "../stories/atrevete/peopleProfile";
import { StaffSlide } from "../components/staffSlide";

const breakpoints = [520, 767, 1100];
const mq = facepaint(breakpoints.map(bp => `@media (min-width: ${bp}px)`));

const topImage = css({
	width: "100%",
	height: "100%",
	objectFit: "cover",
});

const topPhrase = css({
	position: "absolute",
	top: 0,
	left: 0,
	width: "100%",
	height: "100%",
	display: "flex",
	justifyContent: "center",
	flexDirection: "column",
	alignItems: "center",
	zIndex: 10,
});

const topLogoWrap = css({
	position: "absolute",
	top: 0,
	left: 0,
	width: "100%",
	height: "100%",
	display: "flex",
	justifyContent: "center",
	alignItems: "center",
	zIndex: 10,
});

const topLogo = css(
	mq({
		width: [250, 300, 600],
	}),
);

const topPhraseText = css(
	mq({
		maxWidth: "90%",
		fontSize: ["20px", "30px", "50px"],
		fontWeight: 700,
		textAlign: "center",
		textShadow: "0 0 10px rgba(255, 242, 210, var(--t1))",
		display: "inline-block",
		background:
			"linear-gradient(90deg, white 0%, white var(--p1), transparent var(--p2), transparent 100%)",
		backgroundClip: "text",
		color: "transparent",
		wordBreak: "normal",
	}),
);

const typoWrap = css(
	mq({
		margin: ["3em 0", "5em 0", "7em 0"],
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
		position: "relative",
	}),
);

const typoStyle = css(
	mq({
		textAlign: "center",
		fontSize: ["15px", "25px", "30px"],
		fontWeight: 700,
		lineHeight: ["45px", "55px", "65px"],
		background:
			"linear-gradient(90deg, white 0%, white var(--p1), transparent var(--p2), transparent 100%)",
		backgroundClip: "text",
		color: "transparent",
		wordBreak: "normal",
	}),
);

const categoryBlock = css({
	width: "100%",
	minHeight: "40vh",
	position: "relative",
});

const postCss = css({
	margin: "10px",
});

const innerCss = css(
	mq({
		marginTop: ["1em", "2em", "3em"],
		display: "flex",
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "center",
	}),
);

const peopleInnerCss = css(
	mq({
		display: "inline-flex",
		flexDirection: "row",
		flexWrap: "nowrap",
		justifyContent: "left",
	}),
);

const peopleScrollCss = css(
	mq({
		maxWidth: "min(90vw, 980px)",
		marginLeft: "Auto",
		marginRight: "Auto",
		overflow: "hidden",
		overflowX: "auto",
		textAlign: "center",
	}),
);

const partnerCss = css({
	margin: "auto",
	maxWidth: "min(90vw, 980px)",
});

const IndexPage: React.FC<PageProps> = ({ data }: any) => {
	return (
		<Common>
			<div css={{ top: -98, position: "relative" }}>
				<div
					css={{
						width: "100%",
						height: "100vh",
						position: "relative",
						zIndex: 0,
						// backgroundColor: "#3e3e3e"
					}}
				>
					{/* <StaticImage src="../images/top.jpg" alt="TopImage" css={topImage} loading="eager"/> */}

					{/* --- top phrase --- */}
					<div css={topPhrase}>
						{/* --- top logo --- */}
						<img
							src={logo}
							css={topLogo}
						/>
						<motion.p
							initial={{ "--p1": "-20%", "--p2": "0%" } as any}
							whileInView={
								{ "--p1": ["-20%", "100%"], "--p2": ["0%", "120%"], "--t1": [0, 0, 0.7] } as any
							}
							viewport={{ once: true }}
							transition={{ duration: 1.5, delay: 1 }}
							css={topPhraseText}
						>
							Special Value for Special Person
						</motion.p>
					</div>
				</div>

				{/* --- event --- */}
				<div css={categoryBlock}>
					<div css={{ textAlign: "center" }}>
						<Head1 text="Event" />
					</div>
					<div css={innerCss}>
						<Events />
					</div>
				</div>

				{/* --- message --- */}
				<div css={typoWrap}>
					<motion.p
						initial={{ "--p1": "-20%", "--p2": "0%" } as any}
						whileInView={{ "--p1": ["-20%", "100%"], "--p2": ["0%", "120%"] } as any}
						viewport={{ once: true }}
						transition={{ duration: 1.5, delay: 1 }}
						css={typoStyle}
					>
						未来を切り開く若者に、最高の仲間とメンターを。
						<br />
						あなたの可能性を広げるプラットフォーム
					</motion.p>
					<div css={{ marginTop: "5%" }}>
						<GoldButton
							text="詳しく見る"
							onClick={() => navigate("/about")}
						/>
					</div>
				</div>

				{/* --- news --- */}
				<div css={categoryBlock}>
					<div css={{ textAlign: "center" }}>
						<Head1 text="News" />
					</div>
					<div css={innerCss}>
						<Posts />
					</div>
					<div
						css={mq({
							textAlign: "center",
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							height: [100, 200, 300],
						})}
					>
						<GoldButton
							text="さらに表示"
							onClick={() => navigate("/post")}
						/>
					</div>
				</div>

				{/* --- staff --- */}
				<div css={categoryBlock}>
					<div css={{ textAlign: "center" }}>
						<Head1 text="Staff" />
					</div>
					<StaffSlide data={data.allContentfulStaff} />
					<div
						css={mq({
							textAlign: "center",
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							height: [100, 150, 200],
						})}
					>
						<GoldButton
							text="一覧を表示"
							onClick={() => navigate("/staff")}
						/>
					</div>
				</div>

				{/* --- Attendee --- */}
				{data.allContentfulSponsor.nodes ? (
					<div css={categoryBlock}>
						<div css={{ textAlign: "center" }}>
							<Head1 text="Attendee" />
						</div>
						<StaffSlide data={data.allContentfulAttendee} />
						<div
							css={mq({
								textAlign: "center",
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								height: [100, 150, 200],
							})}
						>
							<GoldButton
								text="一覧を表示"
								onClick={() => navigate("/attendee")}
							/>
						</div>
					</div>
				) : (
					<></>
				)}

				{/* --- official partner --- */}
				{data.allContentfulSponsor.nodes ? (
					<div css={categoryBlock}>
						<div css={{ textAlign: "center" }}>
							<Head1 text="Official Partner" />
						</div>
						<div css={[innerCss, partnerCss]}>
							{data.allContentfulSponsor.nodes?.map((sponsor: any) => (
								<div
									key={sponsor.contentful_id}
									css={{
										margin: "1em",
										flex: "0 0 calc(50% - 2em)", // スマートフォン表示時の幅を50%に設定
										boxSizing: "border-box",
										"@media (max-width: 767px)": {
											// スマートフォン表示のメディアクエリ
											flex: "0 0 calc(100% - 2em)", // 幅を100%に設定
										},
									}}
								>
									<a
										href={sponsor.url}
										target="_blank"
										rel="noopener noreferrer"
									>
										<GatsbyImage
											css={{ width: "100%", height: "100%", objectFit: "cover" }}
											image={sponsor.logo.gatsbyImageData}
											alt={sponsor.name}
										/>
									</a>
								</div>
							))}
						</div>
					</div>
				) : (
					<></>
				)}
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
		allContentfulSponsor(filter: { hidden: { ne: true } }) {
			nodes {
				contentful_id
				url
				logo {
					gatsbyImageData
				}
				name
			}
		}
		allContentfulPost(sort: { createdAt: DESC }, limit: 3, filter: { hidden: { ne: true } }) {
			nodes {
				contentful_id
				title
				slug
				createdAt(formatString: "yyyy/MM/DD")
				eye_catch {
					gatsbyImageData
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
		allContentfulAttendee: allContentfulPeople(
			filter: { profileType: { eq: false }, hidden: { ne: true } }
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

export default IndexPage;

export const Head: HeadFC = ({ data }: any) => (
	<Html_Head
		type="website"
		url={data.site.siteMetadata.siteUrl}
	></Html_Head>
);
