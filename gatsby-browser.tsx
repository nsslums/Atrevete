import React from "react";
import { createRoot } from "react-dom/client";
import "@fontsource/zen-kaku-gothic-new/400.css";
import "@fontsource/zen-kaku-gothic-new/700.css";
import "@fontsource/zen-old-mincho/400.css";
import "@fontsource/zen-old-mincho/700.css";

export const wrapRootElement = ({ element }) => {
	return <>{element}</>;
};

export const replaceHydrateFunction = () => {
	return (element, container) => {
		const root = createRoot(container);
		root.render(element);
	};
};
