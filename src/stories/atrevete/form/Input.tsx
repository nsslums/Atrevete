import { css } from "@emotion/react";
import React from "react";

interface inputProps {
	label?: string;
	type: string;
	name: string;
	id: string;
	required?: boolean;
	disabled?: boolean;
	pattern?: string;
}

const rootCss = css({
	position: "relative",
	fontSize: 16,
	marginTop: "1.5em",
});

const labelBase = css({
	position: "absolute",
	top: 35,
	left: 15,
	transition: "0.4s cubic-bezier(0,.5,.5,1)",
	fontSize: "1em",
	zIndex: 10,
});
const InputCss = {
	width: "100%",
	height: 40,
	borderBottom: "1px #5f5f5f solid",
	padding: "7px 10px",
	marginTop: 30,
	backgroundColor: "#202020",
	borderRadius: "5px 5px 0 0",
	boxSizing: "border-box",
};

const statusDef = css({
	position: "absolute",
	bottom: 0,
	left: "50%",
	height: 1,
	width: 0,
	background: "#ffffff",
	transition: ".3s",
});

const statusSelect = css({
	left: "0%",
	width: "100%",
});

const statusErr = css({
	left: "0%",
	width: "100%",
	background: "#ff5555",
});

const statusSuc = css({
	left: "0%",
	width: "100%",
	background: "#ccccdd",
});

const label_up = css({
	top: 5,
	left: 5,
	fonrSize: "0.8em",
});

const submitCss = css({
	position: "relative",
	padding: "15px 50px",
	minWidth: 200,
	minHeight: 50,
	fontSize: 20,
	color: "black",
	background: "white",
	backgroundImage: "none",
	outline: "none",
	borderRadius: "3px",
	overflow: "hidden",
});

export const Input = ({
	label,
	type,
	name,
	id,
	required = false,
	disabled = false,
	pattern,
	...props
}: inputProps) => {
	const [value, setValue] = React.useState("");
	const [isSelect, setSelect] = React.useState(false);
	const [isErr, setErr] = React.useState(false);

	const changeHandle = (e: any) => {
		setValue(e.target.value);
	};

	const onSelectHandel = (e: any) => {
		setSelect(true);
	};

	const onBlurHandel = (e: any) => {
		setErr(
			required
				? !e.target.value.match(pattern) || !e.target.value
				: e.target.value
				? !e.target.value.match(pattern)
				: false,
		); // パターン外 or 必須時空白
		setSelect(false);
	};

	const labelreq = required
		? [
				labelBase,
				css({
					"&:after": {
						content: '"*"',
						marginLeft: ".2em",
					},
				}),
		  ]
		: labelBase;
	const labelStyle = isSelect || value ? [labelreq, label_up] : labelreq;
	const InputStyle =
		isSelect || value
			? InputCss
			: [
					InputCss,
					css({
						"&::-webkit-datetime-edit-fields-wrapper": {
							display: "none",
						},
					}),
			  ];

	const submitStyle = disabled ? [submitCss, css({ backgroundColor: "gray" })] : submitCss;

	return (
		<div css={rootCss}>
			{label ? (
				<label
					htmlFor={id}
					css={labelStyle}
				>
					{label}
				</label>
			) : (
				false
			)}
			{type == "submit" ? (
				<input
					type="submit"
					disabled={disabled}
					css={submitStyle}
					pattern={pattern}
					{...props}
				/>
			) : (
				<>
					<input
						type={type}
						name={name}
						id={id}
						value={value}
						required={required}
						css={InputStyle}
						onBlur={onBlurHandel}
						onSelect={onSelectHandel}
						onChange={changeHandle}
						autoComplete="off"
						pattern={pattern}
						{...props}
					/>
					<span
						css={
							isSelect
								? [statusDef, statusSelect]
								: isErr
								? [statusDef, statusErr]
								: value
								? [statusDef, statusSuc]
								: statusDef
						}
					></span>
				</>
			)}
		</div>
	);
};
