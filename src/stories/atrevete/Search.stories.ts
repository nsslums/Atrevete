import type { Meta, StoryObj } from "@storybook/react";

import { Search } from "./Search";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
	title: "Atrevete/Search",
	component: Search,
	tags: ["autodocs"],
} satisfies Meta<typeof Search>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {},
};

export const Open: Story = {
	args: {
		open: true,
	},
};
