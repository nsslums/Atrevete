import type { Meta, StoryObj } from "@storybook/react";

import { Connection } from "./Connection";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
	title: "Atrevete/Connection",
	component: Connection,
	tags: ["autodocs"],
} satisfies Meta<typeof Connection>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: Story = {
	args: {
		title: "イベント名",
		mode: "event",
	},
};
