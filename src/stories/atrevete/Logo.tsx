import { css } from "@emotion/react";
import { Link } from "gatsby-link";
import logo from "../../../static/Atrevete.svg";

interface LogoProps {
	isHome?: boolean;
	width?: number;
}

export const Logo = ({ isHome = false, width = 200, ...props }: LogoProps) => {
	return (
		<div>
			{isHome ? (
				<Link
					to="/"
					aria-label="go to top-page"
				>
					<img
						css={{ width: width }}
						width={width}
						height={0.5625 * width}
						src={logo}
						alt="logo"
					/>
				</Link>
			) : (
				<img
					css={{ width: `${width}` }}
					src={logo}
					alt="logo"
				/>
			)}
		</div>
	);
};

export default Logo;
