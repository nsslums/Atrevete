import type { Meta, StoryObj } from "@storybook/react";

import { PostCard } from "./PostCard";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
	title: "Atrevete/PostCard",
	component: PostCard,
	tags: ["autodocs"],
} satisfies Meta<typeof PostCard>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: Story = {
	args: {
		title: "イベント名",
	},
};
