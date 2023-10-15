import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "./Input";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
	title: "Atrevete/Input",
	component: Input,
	tags: ["autodocs"],
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		label: "メール",
		type: "email",
		name: "email",
		id: "email",
	},
};
