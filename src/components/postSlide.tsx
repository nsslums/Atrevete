import { graphql, useStaticQuery } from "gatsby";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { EventCard } from "../stories/atrevete/event/EventCard";
import { FaChevronLeft } from "@react-icons/all-files/fa/FaChevronLeft";
import { FaChevronRight } from "@react-icons/all-files/fa/FaChevronRight";
import { GetSlug } from "../api/getSlug";
import { PostCard } from "../stories/atrevete/event/PostCard";

const arrow_css = css({
	position: "absolute",
	width: "40px",
	height: "40px",
	top: "50%",
	transform: "translate(0, -50%)",
	backgroundColor: "rgb(255 255 255 / 60%)",
	boxShadow: "0 0 10px rgb(0 0 0 / 50%)",
	borderRadius: "90px",
	cursor: "pointer",
	display: "flex",
	justifyContent: "center",
	alignItems: "center",
	color: "#1E1E1E",
	zIndex: 20,
	transition: "all 0.2s ease",

	"&:hover": {
		backgroundColor: "white",

		"&:active": {
			transform: "translate(0, -50%) scale(0.95)",
		},
	},

	"&.slick-disabled": {
		opacity: 0.1,
		pointerEvents: "none",
	},
});

const sleeveCurtain = css({
	// "&::before": {
	//     content: '""',
	//     position: "absolute",
	//     top: 0,
	//     left: 0,
	//     width: "50px",
	//     height: "100%",
	//     background: "linear-gradient(90deg, #121212 0%, rgba(18, 18, 18, 0.713542) 47.4%, rgba(18, 18, 18, 0) 100%)",
	//     zIndex: 10
	// },
	//
	// "&::after": {
	//     content: '""',
	//     position: "absolute",
	//     top: 0,
	//     right: 0,
	//     width: "50px",
	//     height: "100%",
	//     background: "linear-gradient(-90deg, #121212 0%, rgba(18, 18, 18, 0.713542) 47.4%, rgba(18, 18, 18, 0) 100%)",
	//     zIndex: 10
	// }
});

function NextArrow(props: any) {
	const { className, style, onClick } = props;
	const classArr = className.split(" ");
	return (
		<div
			css={[arrow_css, { right: "-20px" }]}
			className={classArr.includes("slick-disabled") ? "slick-disabled" : ""}
			onClick={onClick}
		>
			<FaChevronRight />
		</div>
	);
}

function PrevArrow(props: any) {
	const { className, style, onClick } = props;
	const classArr = className.split(" ");
	return (
		<div
			css={[arrow_css, { left: "-20px" }]}
			className={classArr.includes("slick-disabled") ? "slick-disabled" : ""}
			onClick={onClick}
		>
			<FaChevronLeft />
		</div>
	);
}

export const Posts: React.FC = () => {
	const result = useStaticQuery(graphql`
		query {
			allContentfulPost(sort: { createdAt: DESC }, limit: 3, filter: { hidden: { ne: true } }) {
				nodes {
					contentful_id
					title
					slug
					createdAt(formatString: "yyyy/MM/DD")
					eye_catch {
						gatsbyImageData
					}
					metadata {
						tags {
							name
						}
					}
				}
			}
		}
	`);

	const newsCount = result.allContentfulPost.nodes?.length || 0;

	let width = 900;
	if (typeof window !== `undefined`) {
		width = window.innerWidth;
	}
	const settings =
		width > 1000
			? {
					infinite: false,
					initialSlide: 0,
					speed: 500,
					dots: false,
					arrows: true,
					slidesToShow: newsCount >= 2 ? 2 : 1,
					slidesToScroll: 1,
					centerMode: false,
					centerPadding: "50px",
					nextArrow: <NextArrow />,
					prevArrow: <PrevArrow />,
			  }
			: {
					infinite: false,
					initialSlide: 0,
					speed: 500,
					dots: false,
					arrows: true,
					slidesToShow: 1,
					slidesToScroll: 1,
					centerMode: true,
					centerPadding: "0px",
					nextArrow: <NextArrow />,
					prevArrow: <PrevArrow />,
			  };
	// slick-disabled

	const Contener = styled.div({
		width: "min(90vw, 980px)",
		margin: "auto",
	});

	return (
		<Contener>
			<div>
				<Slider
					{...settings}
					css={sleeveCurtain}
				>
					{result.allContentfulPost.nodes?.map((post: any) => {
						return (
							<div
								css={css({ margin: 10, display: "flex !important", justifyContent: "center" })}
								key={post.contentful_id}
							>
								{post.eye_catch ? (
									<PostCard
										node={post}
										image={post.eye_catch.gatsbyImageData}
									/>
								) : (
									<PostCard node={post} />
								)}
							</div>
						);
					})}
				</Slider>
			</div>
		</Contener>
	);
};
