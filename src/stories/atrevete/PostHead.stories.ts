import { Meta, StoryObj } from "@storybook/react";
import { PostHead } from "./PostHead";

const meta = {
    title: 'Atrevete/PostHead',
    component: PostHead,
    tags: ['autodocs'],
} satisfies Meta<typeof PostHead>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'イベント名',
    date: "2023/01/01"
  },
};
