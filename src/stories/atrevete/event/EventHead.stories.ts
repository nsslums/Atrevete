import { Meta, StoryObj } from "@storybook/react";
import { EventHead } from "./EventHead";

const meta = {
	title: "Atrevete/EventHead",
	component: EventHead,
	tags: ["autodocs"],
} satisfies Meta<typeof EventHead>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		title: "イベント名",
		date: "2030/01/01",
	},
};

export const End: Story = {
	args: {
		title: "イベント名",
		date: "2020/01/01",
		isActive: false,
	},
};
