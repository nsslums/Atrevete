import type { Meta, StoryObj } from "@storybook/react";
import { Certifications } from "./Certifications";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
	title: "Atrevete/Certifications",
	component: Certifications,
	tags: ["autodocs"],
} satisfies Meta<typeof Certifications>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {},
};
