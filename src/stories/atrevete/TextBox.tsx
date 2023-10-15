import { css } from "@emotion/react";
import { motion } from "framer-motion";

interface TextBoxProps {
	label: string;
	placeholder?: string;
	type?:
		| "date"
		| "datetime-local"
		| "email"
		| "month"
		| "number"
		| "password"
		| "tel"
		| "text"
		| "time"
		| "url"
		| "week";
	maxlength?: number;
	value?: string;
}

const Style = css({
	border: "1px solid white",
	backgroundColor: "rgba255,255,255,1)",
	color: "white",
});

export const TextBox = ({
	label,
	placeholder,
	type = "text",
	maxlength,
	value,
	...props
}: TextBoxProps) => {
	return (
		<label>
			<p>{label}</p>
			<input
				css={Style}
				value={value}
				name={label}
				placeholder={placeholder}
				maxLength={maxlength}
				type={type}
				{...props}
			></input>
		</label>
	);
};
