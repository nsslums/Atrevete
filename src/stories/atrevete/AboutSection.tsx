import { css } from "@emotion/react";
import { GatsbyImage, IGatsbyImageData, StaticImage } from "gatsby-plugin-image";
import { AboutHead1 } from "./AboutHead1";
import facepaint from "facepaint";
import { motion } from "framer-motion";
import React from "react";

const breakpoints = [520, 767, 1100];
const mq = facepaint(breakpoints.map(bp => `@media (min-width: ${bp}px)`));

interface AboutSectionProps {
	title?: string;
	bgTitle: string;
	oneWord?: string;
	image: IGatsbyImageData;
	reverse?: "row" | "row-reverse";
	fontSize?: string;
	children: React.ReactNode;
}

const Style = css(
	mq({
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
		marginBottom: ["4em", "6em", "8em"],
		width: "100%",
	}),
);

const WrapStyle = css(
	mq({
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		flexDirection: "row",
		flexWrap: "wrap",
		gap: "20px 60px",
		width: "90%",
		maxWidth: "1200px",
	}),
);

const imageStyle = css({
	display: "box",
	// width: '60%',
	aspectRatio: "16/9",
	height: "230px",
	// margin: '0 60px',
	borderRadius: "3px",
});

const oneWordStyle = css(
	mq({
		margin: "70px 0",
		maxWidth: "90%",
		textAlign: "center",
		fontWeight: "500",
		fontSize: ["25px", "30px", "35px", "40px"],
	}),
);
const oneWordChildStyle = css({
	background:
		"linear-gradient(120deg, white 0%, white var(--p1), #a18153 var(--p1), #a18153 var(--p2), transparent var(--p2), transparent 100%)",
	color: "transparent",
	backgroundClip: "text",
});

const typoStyle = css(
	mq({
		display: "flex",
		justifyContent: "center",
		width: ["80%", "70%", "60%", "40%"],
		lineHeight: "40px",
		// textAlign: 'center',
		height: "fit-content",
	}),
);
const typoChildStyle = css({
	width: "fit-content",
	background:
		"linear-gradient(120deg, white 0%, white var(--p1), #a18153 var(--p1), #a18153 var(--p2), transparent var(--p2), transparent 100%)",
	color: "transparent",
	backgroundClip: "text",
	fontWeight: "500",
	wordBreak: "keep-all",
	fontSize: "1em",
	whiteSpace: "pre-wrap",
	overflowWrap: "break-word",
});

export const AboutSection = ({
	title,
	oneWord,
	reverse = "row",
	image,
	fontSize,
	bgTitle,
	...props
}: AboutSectionProps) => {
	return (
		<div css={Style}>
			{/* --- section title --- */}
			{title ? (
				<AboutHead1
					text={title}
					bgText={bgTitle}
				></AboutHead1>
			) : (
				<></>
			)}

			{/* --- section phrase --- */}
			{oneWord ? (
				<motion.div
					css={oneWordStyle}
					initial={{ "--p1": "0%", "--p2": "0%" } as any}
					whileInView={{ "--p1": "100%", "--p2": "110%" } as any}
					viewport={{ once: true }}
					transition={{ ease: "anticipate", duration: 3 }}
				>
					<motion.p css={oneWordChildStyle}>{oneWord}</motion.p>
				</motion.div>
			) : (
				<div css={mq({ margin: [20, 30, 40] })}></div>
			)}

			{/* --- section image --- */}
			<div css={[WrapStyle, { flexDirection: `${reverse}` }]}>
				<motion.div
					initial={{ opacity: 0 }}
					whileInView={{ opacity: 1 }}
					viewport={{ once: true }}
					transition={{ ease: "anticipate", delay: 0.1, duration: 1 }}
				>
					<GatsbyImage
						css={imageStyle}
						alt="image"
						image={image}
					/>
				</motion.div>

				{/* --- section message --- */}
				<div css={typoStyle}>
					<motion.div
						initial={{ "--p1": "0%", "--p2": "0%" } as any}
						whileInView={{ "--p1": "100%", "--p2": "110%" } as any}
						viewport={{ once: true }}
						transition={{ ease: "anticipate", delay: 0.3, duration: 3.5 }}
						css={[typoChildStyle, { fontSize: `${fontSize}` }]}
					>
						{props.children}
					</motion.div>
				</div>
			</div>
		</div>
	);
};
