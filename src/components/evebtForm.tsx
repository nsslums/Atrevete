import * as React from "react";
import { Link, graphql, navigate, useStaticQuery } from "gatsby";
import { Pulldown } from "../stories/atrevete/form/Pulldown";
import { Input } from "../stories/atrevete/form/Input";
import { TextArea } from "../stories/atrevete/form/TextArea";
import { Certifications } from "../stories/atrevete/form/Certifications";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { css } from "@emotion/react";
import { Head1 } from "../stories/atrevete/Head1";

const linkStyle = css({
	padding: "0.5em",
	color: "skyblue",
});

const recapcha = css({
	fontFamily: "'Zen Kaku Gothic New', sans-serif",
	marginTop: "20px",
	textAlign: "center",
	fontSize: "0.75rem",
	color: "gray",
});

const EventForm = ({ event }) => {
	const [submitdis, setSubmitdis] = React.useState(false);
	const { executeRecaptcha } = useGoogleReCaptcha();

	const data = useStaticQuery(graphql`
		query {
			site {
				siteMetadata {
					title
					description
					siteUrl
					social {
						twitter
					}
				}
			}
			allContentfulEvent(filter: { hidden: { ne: true } }) {
				nodes {
					title
					end_reception(formatString: "yyyy/M/D")
					start_reception(formatString: "yyyy/M/D")
				}
			}
		}
	`);

	const events = data.allContentfulEvent.nodes?.filter((event: any) => {
		if (!event.start_reception)
			// 受け付け開始 未入力
			return false;

		const startDate = new Date(event.start_reception); // 受け付け開始 前
		if (startDate.getTime() > new Date().getTime()) return false;

		if (event.end_reception && new Date(event.end_reception).getTime() < new Date().getTime())
			// 受け付け終了後
			return false;

		return true;
	});

	const options = events.map((event: any) => {
		return { value: event.title, label: event.title };
	});

	const default_value = { value: event, label: event };

	const onSubmit = async (e: any) => {
		e.preventDefault(); // デフォルトの動作のキャンセル
		console.log("submit");
		setSubmitdis(true);

		if (!executeRecaptcha) {
			setSubmitdis(false);
			alert("reCAPTCHA init err.");
			return;
		}
		const token = await executeRecaptcha("contact");

		const formData = new FormData();
		formData.append("event", e.target.event.value);
		formData.append("name", e.target.name.value);
		formData.append("name_kana", e.target.name_kana.value);
		formData.append("birthday", e.target.birthday.value);
		formData.append("university", e.target.university.value);
		formData.append("email", e.target.email.value);
		formData.append("certifications", e.target.certifications_hiddn.value);
		formData.append("career", e.target.career.value);
		formData.append("pr", e.target.pr.value);
		formData.append("instagram", e.target.instagram.value);
		formData.append("tiktok", e.target.tiktok.value);
		formData.append("twitter", e.target.twitter.value);
		formData.append("token", token);

		// formData.append("file", e.target.file.files[0])

		const response = await window
			.fetch("/api/event", {
				method: "POST",
				body: formData,
			})
			.then(res => res.json())
			.catch(err => alert("通信に失敗しました."));
		console.log(response);

		if (response?.status === "success") {
			await navigate("/thanks");
		} else {
			response.error.message ? alert(response.error.message) : alert("エラーが発生しました．");
		}
		setSubmitdis(false);
	};

	// --- input pattern match --- //
	const pattern = {
		kana: "^([\u30A1-\u30F6]+[\x20\u3000]?)+$",
		mail: "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*.[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9]$",
		instagram: "^[0-9a-zA-Z._]{3,30}$",
		tiktok: "^@[0-9a-z._]{2,24}$",
		twitter: "^@[0-9a-zA-Z._]{1,15}$",
	};

	return (
		<div
			css={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				marginBottom: "5em",
			}}
		>
			{/* --- form --- */}
			<Head1 text="イベント申込" />
			<p css={{ marginTop: "20px" }}>アスタリスク（*）は必須項目です。</p>
			<form
				css={{ width: "85%", maxWidth: 600 }}
				action="/api/event"
				method="post"
				onSubmit={onSubmit}
			>
				{/* --- form input --- */}
				<Pulldown
					label="イベント"
					name="event"
					id="event"
					options={options}
					default_val={default_value}
					required={true}
				/>
				<Input
					label="名前"
					type="text"
					name="name"
					id="name"
					required={true}
				/>
				<Input
					label="カタカナ（全角）"
					type="text"
					name="name_kana"
					id="name_kana"
					required={true}
					pattern={pattern.kana}
				/>
				<Input
					label="生年月日"
					type="date"
					name="birthday"
					id="birthday"
					required={true}
				/>
				<Input
					label="メールアドレス（半角英数字）"
					type="email"
					name="email"
					id="email"
					required={true}
					pattern={pattern.mail}
				/>
				<Input
					label="大学名"
					type="text"
					name="university"
					id="university"
				/>
				<TextArea
					label="経歴・学外活動"
					name="career"
					id="career"
				/>
				<Certifications
					label="資格"
					name="certifications_hiddn"
					id="certifications"
					required={false}
				/>
				<TextArea
					label="自己PR、参加目的など"
					name="pr"
					id="pr"
					required={true}
				/>

				{/* --- file upload form --- */}
				{/* <div css={css({
                        marginTop: 30,
                    })}>
                        <UploadFile required={true} />
                    </div> */}

				<Input
					label="Instagram ID (user)"
					type="text"
					name="instagram"
					id="instagram"
					pattern={pattern.instagram}
				/>
				<Input
					label="TikTok ID (@user)"
					type="text"
					name="tiktok"
					id="tiktok"
					pattern={pattern.tiktok}
				/>
				<Input
					label="Twitter ID (@user)"
					type="text"
					name="twitter"
					id="twitter"
					pattern={pattern.twitter}
				/>
				<div
					css={css({
						display: "flex",
						marginTop: 30,
						flexDirection: "column",
						alignItems: "center",
						marginBottom: "5em",
					})}
				>
					{/* --- privacy policy notification --- */}
					<p
						css={{
							fontSize: "13px",
							textAlign: "center",
							fontFamily: "'Zen Kaku Gothic New', sans-serif",
						}}
					>
						「Submit」を押す前に
						<Link
							css={linkStyle}
							to="/privacy"
						>
							プライバシーポリシー
						</Link>
						に同意する必要があります。
					</p>

					{/* --- submit button --- */}
					<div css={recapcha}>
						<p>This site is protected by reCAPTCHA and the Google</p>
						<p>
							<a
								css={linkStyle}
								href="https://policies.google.com/privacy"
								target="_blank"
								rel="noreferrer"
							>
								Privacy Policy
							</a>{" "}
							and
							<a
								css={linkStyle}
								href="https://policies.google.com/terms"
								target="_blank"
								rel="noreferrer"
							>
								Terms of Service
							</a>{" "}
							apply.
						</p>
					</div>
					<Input
						type="submit"
						name="submit"
						id="submit"
						disabled={submitdis}
					/>
				</div>
			</form>
		</div>
	);
};

export default EventForm;
