import type { Meta, StoryObj } from "@storybook/react";

import { EventFormCard } from "./EventFormCard";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
	title: "Atrevete/EventFormCard",
	component: EventFormCard,
	tags: ["autodocs"],
} satisfies Meta<typeof EventFormCard>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Active: Story = {
	args: {
		isActive: true,
		start_date: "2023/5/1",
		end_date: "2024/10/11",
	},
};

export const Disable: Story = {
	args: {
		start_date: "2022/1/1",
		end_date: "2022/7/30",
	},
};

export const CommingSoon: Story = {
	args: {},
};
