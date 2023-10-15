import { css } from "@emotion/react";
import { Link } from "gatsby-link";

interface GoldLinkProps {
	text: string;
	to: string;
}

const Style = css({
	position: "relative",
	color: "white",
	fontSize: "40px",
	"&:hover": {
		color: "transparent",
		background: "var(--gold-gradient)",
		backgroundClip: "text",
	},
});

const noiseOverlay = css({
	position: "absolute",
	// top: 0,
	left: 0,
	width: "100%",
	height: "100%",
	color: "transparent",
	backgroundImage: "url(/noise.png)",
	backgroundRepeat: "repeat",
	backgroundSize: "40%",
	backgroundBlendMode: "color-dodge",
	opacity: "20%",
	backgroundClip: "text",
});

export const GoldLink = ({ text, to }: GoldLinkProps) => {
	return (
		<Link
			css={Style}
			to={to}
		>
			{text}
			<span css={noiseOverlay}>{text}</span>
		</Link>
	);
};
