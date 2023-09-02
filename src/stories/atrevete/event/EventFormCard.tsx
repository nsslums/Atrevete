import { css } from "@emotion/react";
import React from "react";
import { Head2 } from "../Head2";
import { GoldButton } from "../GoldButton";
import { Transform } from "stream";
import facepaint from "facepaint";

const breakpoints = [520, 767, 1100];
const mq = facepaint(breakpoints.map(bp => `@media (min-width: ${bp}px)`));

interface EventFormCardProps {
	isActive?: boolean;
	start_date: string;
	end_date: string;
	onClick?: () => void;
}

const base = css(
	mq({
		position: "relative",
		display: "flex",
		flexDirection: ["column", "column", "row"],
		justifyContent: "space-around",
		alignItems: "center",
		width: ["50%", "70%", "80%", "90%"],
		padding: "2em 7em",
		borderRadius: "15px",
		overflow: "hidden",
		border: "1px dashed transparent",
	}),
);

const disable = css({
	border: "1px dashed white",

	"&::before": {
		position: "absolute",
		zIndex: 10,
		top: 0,
		left: 0,
		width: "100%",
		height: "100%",
		backgroundColor: "rgb(0 0 0 / 60%)",
		content: '""',
	},

	"&::after": {
		position: "absolute",
		zIndex: 10,
		top: "50%",
		left: "50%",
		content: '"受付は終了しました"',
		fontSize: 20,
		textShadow: "0 0 5px black",
		transform: "translate(-50%, -50%)",
	},
});

const commingsoon = css({
	border: "1px dashed white",

	"&::before": {
		position: "absolute",
		zIndex: 10,
		top: 0,
		left: 0,
		width: "100%",
		height: "100%",
		backgroundColor: "rgb(0 0 0 / 60%)",
		content: '""',
	},

	"&::after": {
		position: "absolute",
		zIndex: 10,
		top: "50%",
		left: "50%",
		content: '"受付開始をお待ちください"',
		fontSize: 20,
		textShadow: "0 0 5px black",
		transform: "translate(-50%, -50%)",
	},
});

export const EventFormCard = ({
	start_date,
	end_date,
	isActive = !end_date ? true : new Date().getTime() < new Date(end_date).getTime(),
	...props
}: EventFormCardProps) => {
	let style = isActive ? base : [base, disable];
	style =
		!start_date || new Date(start_date).getTime() > new Date().getTime()
			? [base, commingsoon]
			: style;
	return (
		<>
			<div css={style}>
				<div
					css={{
						width: "50%",
						display: "flex",
						flexDirection: "column",
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<Head2 text="応募期間" />
					{!start_date && !end_date ? (
						<p css={{ fontFamily: "'Zen Kaku Gothic New', sans-serif" }}>未定</p>
					) : (
						<p css={{ fontFamily: "'Zen Kaku Gothic New', sans-serif" }}>
							{start_date} ~ {end_date}
						</p>
					)}
				</div>
				<div
					css={{
						width: "50%",
					}}
				>
					<GoldButton
						text="応募はこちら"
						{...props}
					/>
				</div>
			</div>
		</>
	);
};
