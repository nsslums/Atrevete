import { css } from "@emotion/react";
import React, { lazy } from "react";
import { CgMenu } from "@react-icons/all-files/cg/CgMenu";
import { RiCloseLine } from "@react-icons/all-files/ri/RiCloseLine";
import { FaInstagram } from "@react-icons/all-files/fa/FaInstagram";
import { GoldLink } from "./GoldLink";

const Logo = lazy(() => import("./Logo"));

interface HeaderProps {
	menuOpen?: boolean;
}

const menu = css({
	position: "fixed",
	top: 0,
	left: 0,
	width: "100%",
	height: "100vh",
	backgroundColor: "rgb(0 0 0 / 70%)",
	backdropFilter: "blur(2px)",
});

const block = css({
	fontSize: 40,
	padding: "5px 0",
	marginRight: "1em",
	fontWeight: "bold",
});

const divider = css({
	width: "220px",
	height: "1px",
	backgroundColor: "rgb(255 255 255 / 20%)",
	marginTop: "1em",
	marginRight: "3em",
});

const snsIcon = css({
	fontSize: "30px",
	marginRight: "0.3em",

	"&:hover": {
		color: "rgb(153 116 62)",
	},
});

export const Header = ({ menuOpen = false }: HeaderProps) => {
	const [openMenu, setOpenMenu] = React.useState(menuOpen);

	const onClick = () => {
		setOpenMenu(!openMenu);
	};

	return (
		<header
			css={{
				width: "100%",
				position: "fixed",
				background: "linear-gradient(black,transparent);",
				top: 0,
				left: 0,
				zIndex: 100,
			}}
		>
			<div
				css={{
					height: "98px",
					width: "95%",
					margin: "auto",
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
				}}
			>
				<div css={{}}>
					<Logo
						width={100}
						isHome={true}
					/>
				</div>
				<div
					css={{
						width: "30px",
						height: "30px",
						cursor: "pointer",
					}}
					onClick={onClick}
				>
					<CgMenu
						css={{
							width: "30px",
							height: "30px",
						}}
					/>
				</div>
			</div>
			{openMenu ? (
				<div css={menu}>
					<div
						css={{
							display: "flex",
							flexDirection: "column",
							alignItems: "flex-end",
						}}
					>
						<div
							css={{
								height: "98px",
								width: "95%",
								margin: "auto",
								display: "flex",
								justifyContent: "flex-end",
								alignItems: "center",
							}}
						>
							<div
								css={{
									width: "30px",
									height: "30px",
									cursor: "pointer",
								}}
								onClick={onClick}
							>
								<RiCloseLine
									css={{
										width: "30px",
										height: "30px",
									}}
								/>
							</div>
						</div>
						<div
							css={block}
							onClick={onClick}
						>
							<GoldLink
								to="/"
								text="トップページ"
							/>
						</div>
						<div
							css={block}
							onClick={onClick}
						>
							<GoldLink
								to="/about"
								text="Atreveteとは"
							/>
						</div>
						<div
							css={block}
							onClick={onClick}
						>
							<GoldLink
								to="/staff"
								text="運営メンバー"
							/>
						</div>
						<div
							css={block}
							onClick={onClick}
						>
							<GoldLink
								to="/attendee"
								text="参加者一覧"
							/>
						</div>
						<div
							css={block}
							onClick={onClick}
						>
							<GoldLink
								to="/post"
								text="投稿"
							/>
						</div>
						<div
							css={block}
							onClick={onClick}
						>
							<GoldLink
								to="/eventForm"
								text="お申し込み"
							/>
						</div>
						<div
							css={block}
							onClick={onClick}
						>
							<GoldLink
								to="/contact"
								text="お問い合わせ"
							/>
						</div>
						<div css={divider} />
						<div
							css={block}
							onClick={onClick}
						>
							<a href="https://www.instagram.com/atrevete__official/">
								<FaInstagram css={snsIcon} />
							</a>
						</div>
					</div>
				</div>
			) : (
				false
			)}
		</header>
	);
};
