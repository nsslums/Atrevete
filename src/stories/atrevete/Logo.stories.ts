import type { Meta, StoryObj } from "@storybook/react";
import { Logo } from "./Logo";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
	title: "Atrevete/Logo",
	component: Logo,
	tags: ["autodocs"],
} satisfies Meta<typeof Logo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		text: "Template",
	},
};
