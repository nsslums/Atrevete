import React from "react";
import { createRoot } from "react-dom/client";

export const wrapRootElement = ({ element }) => {
	return (
		<>
			{element}
			<link
				rel="preconnect"
				href="https://fonts.googleapis.com"
			/>
			<link
				rel="preconnect"
				href="https://fonts.gstatic.com"
				crossOrigin="anonymous"
			/>
			<link
				href="https://fonts.googleapis.com/css2?family=Zen+Kaku+Gothic+New:wght@400;500;700;900&family=Zen+Old+Mincho:wght@400;700&display=swap"
				rel="stylesheet"
			></link>
		</>
	);
};

export const replaceHydrateFunction = () => {
	return (element, container) => {
		const root = createRoot(container);
		root.render(element);
	};
};
