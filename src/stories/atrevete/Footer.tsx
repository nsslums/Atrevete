import { css } from "@emotion/react";
import React from "react";
import { Logo } from "./Logo";
import { Link } from "gatsby";
import facepaint from "facepaint";

const breakpoints = [520, 767, 1100];
const mq = facepaint(breakpoints.map(bp => `@media (min-width: ${bp}px)`));

interface FooterProps {}

const footerWrap = css(
	mq({
		display: "flex",
		width: "100%",
		flexDirection: ["column", "column", "column", "column"],
		alignItems: "center",
	}),
);

const menuWrap = css(
	mq({
		display: "flex",
		width: "100%",
		marginTop: "40px",
		justifyContent: "center",
		alignItems: ["center", "start", "start", "start"],
		gap: ["0 0", "0 50px", "0 80px", "0 120px"],
		flexDirection: ["column", "row", "row", "row"],
		textAlign: ["center", "left", "left", "left"],
	}),
);

const menuInner = css(
	mq({
		// fontFamily: 'sans-serif',
		// fontSize: '0.9em'
		letterSpacing: "0.15em",
	}),
);

const logoStyle = css(mq({}));

const head = css(
	mq({
		marginTop: [20, 0, 0, 0],
		marginBottom: "20px",
		fontWeight: "900",
		color: "#7c7c7c",
	}),
);

const link = css({
	display: "block",
	marginBottom: "8px",

	"&:hover": {
		color: "#ccb37e",
	},
});

export const Footer = ({}: FooterProps) => {
	const year = new Date().getUTCFullYear();
	return (
		<footer
			css={{
				width: "100%",
				position: "relative",
				top: 0,
				left: 0,
				background: "black",
				borderTop: "solid 0.5px rgb(50 50 50)",
			}}
		>
			<div
				css={{
					width: "95%",
					display: "flex",
					flexDirection: "column",
					justifyContent: "start",
					// height: 98,
					margin: "auto",
				}}
			>
				<div css={{ margin: "20px" }}>
					<div css={footerWrap}>
						<div css={logoStyle}>
							<Logo
								isHome={true}
								width={150}
							/>
						</div>
						<div css={menuWrap}>
							<div css={menuInner}>
								<p css={head}>メニュー</p>
								<Link
									to="/"
									css={link}
								>
									トップページ
								</Link>
								<Link
									to="/about"
									css={link}
								>
									Atreveteとは
								</Link>
								<Link
									to="/staff"
									css={link}
								>
									運営メンバー
								</Link>
								<Link
									to="/attendee"
									css={link}
								>
									参加者一覧
								</Link>
								<Link
									to="/post"
									css={link}
								>
									投稿
								</Link>
								<Link
									to="/privacy"
									css={link}
								>
									プライバシーポリシー
								</Link>
							</div>
							<div css={menuInner}>
								<p css={head}>フォーム</p>
								<Link
									to="/contact"
									css={link}
								>
									お問い合わせ
								</Link>
								<Link
									to="/eventForm"
									css={link}
								>
									お申し込み
								</Link>
							</div>
							<div css={menuInner}>
								<p css={head}>SNS</p>
								<a
									href="https://www.instagram.com/atrevete__official/"
									target="_blank"
									css={link}
									rel="noreferrer"
								>
									Instagram
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div></div>
			<div
				css={{
					textAlign: "center",
					paddingBottom: "0.7em",
					fontFamily: "sans-serif",
					color: "rgb(100 100 100)",
				}}
			>
				<small
					css={{
						fontSize: "0.7em",
					}}
				>
					Copyright &copy; {year} Atrevete. All rights reserved.
				</small>
			</div>
		</footer>
	);
};

export default Footer;
