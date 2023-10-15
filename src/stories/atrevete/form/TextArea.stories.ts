import type { Meta, StoryObj } from "@storybook/react";
import { TextArea } from "./TextArea";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
	title: "Atrevete/TextArea",
	component: TextArea,
	tags: ["autodocs"],
} satisfies Meta<typeof TextArea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		label: "自己PR",
		name: "email",
		id: "email",
	},
};
