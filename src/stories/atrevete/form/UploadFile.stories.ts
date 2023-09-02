import type { Meta, StoryObj } from "@storybook/react";
import { UploadFile } from "./UploadFile";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
	title: "Atrevete/UploadFile",
	component: UploadFile,
	tags: ["autodocs"],
} satisfies Meta<typeof UploadFile>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {},
};
