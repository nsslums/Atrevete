import { css } from "@emotion/react";
import React from "react";
import { TfiTrash } from "react-icons/tfi";
import { GoPlusSmall } from "@react-icons/all-files/go/GoPlusSmall";

type Certification = {
	readonly id: number;
	text: string;
};

interface CertificationsProps {
	label?: string;
	name: string;
	id: string;
	initData?: any;
	required: boolean;
}

const rootCss = css({
	position: "relative",
	fontSize: 16,
	width: "100%",
	marginTop: "1.5em",
});

const labelBase = css({
	position: "absolute",
	top: 38,
	left: 15,
	transition: "0.4s cubic-bezier(0,.5,.5,1)",
	fontSize: "1em",
});

const InputCss = css({
	width: "100%",
	height: 40,
	borderBottom: "1px #5f5f5f solid",
	padding: "7px 10px",
	marginTop: 30,
	backgroundColor: "#202020",
	borderRadius: "5px 5px 0 0",
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

const statusSuc = css({
	left: "0%",
	width: "100%",
	background: "#ccccdd",
});

const ButtonCss = css({
	position: "absolute",
	top: 42,
	right: 10,
});

const label_up = css({
	top: 5,
	left: 5,
	fonrSize: "0.8em",
});

const listItem = css({
	padding: "5px 10px",
	display: "flex",
	justifyContent: "space-between",
	alignItems: "center",
	height: 45,
	boxSizing: "border-box",
	color: "#CDCDCD",
	position: "relative",
	marginTop: ".5em",
	backgroundColor: "#202020",
});
// [{"id":1684744313989,"text":"第1種普通自動車免許"},{"id":1684744299790,"text":"実用英語技能検定 準1級"}]

export const Certifications = ({
	label = "",
	name,
	id,
	initData = [],
	required = false,
}: CertificationsProps) => {
	const [value, setValue] = React.useState("");
	const [datas, setDatas] = React.useState(initData);
	const [isSelect, setSelect] = React.useState(false);

	const onSelectHandel = (e: any) => {
		setSelect(true);
	};

	const onBlurHandel = (e: any) => {
		addData(e);
		setSelect(false);
	};

	const addData = (e: any) => {
		e.preventDefault(); // デフォルトの動作のキャンセル
		if (!value) return;

		const newCertification: Certification = {
			id: new Date().getTime(),
			text: value,
		};

		setDatas((datas: any) => [newCertification, ...datas]);
		setValue("");
	};

	const deleteHandle = (e: any, id: number) => {
		e.preventDefault(); // デフォルトの動作のキャンセル
		setDatas((datas: any) => datas.filter((data: any) => data.id !== id));
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

	return (
		<div css={rootCss}>
			<div css={css({ position: "relative" })}>
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
				<input
					type="text"
					id={id}
					css={InputCss}
					value={value}
					onChange={(e: any) => setValue(e.target.value)}
					onSelect={onSelectHandel}
					onBlur={onBlurHandel}
				/>
				<input
					hidden
					name={name}
					value={JSON.stringify(datas)}
					readOnly
					tabIndex={-1}
				/>
				<button
					onClick={addData}
					css={ButtonCss}
					tabIndex={-1}
				>
					<GoPlusSmall />
				</button>
				<span
					css={
						isSelect
							? [statusDef, statusSelect]
							: datas.length > 0
							? [statusDef, statusSuc]
							: statusDef
					}
				></span>
			</div>
			{datas.length > 0 ? (
				<ul>
					{datas.map((data: any) => (
						<li
							key={data.id}
							css={listItem}
						>
							<p>{data.text}</p>
							<button onClick={(e: any) => deleteHandle(e, data.id)}>
								<TfiTrash css={{ width: 20, hegith: 20 }} />
							</button>
						</li>
					))}
				</ul>
			) : (
				false
			)}
		</div>
	);
};
