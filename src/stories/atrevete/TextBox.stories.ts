import type { Meta, StoryObj } from "@storybook/react";
import { TextBox } from "./TextBox";

const meta = {
	title: "Atrevete/TextBox",
	component: TextBox,
	tags: ["autodocs"],
} satisfies Meta<typeof TextBox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		label: "label",
	},
};
