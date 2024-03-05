import { css } from "@emotion/react";
import React from "react";
import Select from "react-select";
import "./Pulldown.css";

interface PulldownProps {
	label?: string;
	options?: any;
	name: string;
	id: string;
	required?: boolean;
	default_val?: any;
}

const rootCss = css({
	position: "relative",
	fontSize: 16,
	marginTop: "1.5em",
	// zIndex: 100,
});

const labelBase = css({
	position: "absolute",
	top: 36,
	left: 15,
	transition: "0.4s cubic-bezier(0,.5,.5,1)",
	fontSize: "1em",
	zIndex: 10,
});

const label_up = css({
	top: 5,
	left: 5,
	fontSize: ".85em",
});

const pullDownCss = css({
	width: "100%",
	height: 40,
	marginTop: 30,
	backgroundColor: "#202020",
	borderRadius: "5px 5px 0 0",
	display: "inline-block",
	boxSizing: "border-box",
});

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

export const Pulldown = ({
	label,
	options = [
		{ value: "value1", label: "値1" },
		{ value: "value2", label: "値2" },
	],
	name,
	id,
	required = false,
	default_val,
}: PulldownProps) => {
	const [isSelect, setIsSelect] = React.useState(false);
	const [value, setValue] = React.useState(default_val);
	const [isErr, setErr] = React.useState(false);

	const onBlurHandle = (e: any) => {
		setErr(required ? !value.value : false); // パターン外 or 必須時空白
		setIsSelect(false);
	};

	const menuOpenHandle = () => {
		setIsSelect(true);
	};

	const changeHandole = (e: any) => {
		setValue(e);
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
	const labelStyle = isSelect || value.value ? [labelreq, label_up] : labelreq;

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
			<>
				<Select
					options={options}
					name={name}
					id={id}
					required={required}
					defaultValue={default_val}
					css={pullDownCss}
					className="inner"
					classNamePrefix="react-select"
					placeholder=""
					components={{ IndicatorSeparator: () => null }}
					onBlur={onBlurHandle}
					onMenuOpen={menuOpenHandle}
					onChange={changeHandole}
				/>
				<span
					css={
						isSelect
							? [statusDef, statusSelect]
							: isErr
							? [statusDef, statusErr]
							: value.value
							? [statusDef, statusSuc]
							: statusDef
					}
				></span>
			</>
		</div>
	);
};
