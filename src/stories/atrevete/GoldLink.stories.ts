import type { Meta, StoryObj } from "@storybook/react";
import { GoldLink } from "./GoldLink";

const meta = {
	title: "Atrevete/GoldLink",
	component: GoldLink,
	tags: ["autodocs"],
} satisfies Meta<typeof GoldLink>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		text: "Link",
		to: "/",
	},
};
