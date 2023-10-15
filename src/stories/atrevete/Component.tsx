import { css } from "@emotion/react";

interface ComponentProps {
	text: string;
}

const Style = css({});

export const Component = ({ text, ...props }: ComponentProps) => {
	return (
		<p
			css={Style}
			{...props}
		>
			{text}
		</p>
	);
};
