import { Meta, StoryObj } from "@storybook/react";
import { EventHead } from "./EventHead";

const meta = {
    title: 'Atrevete/EventHead',
    component: EventHead,
    tags: ['autodocs'],
} satisfies Meta<typeof EventHead>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'イベント名',
  },
};

export const End: Story = {
  args: {
    title: 'イベント名',
    isActive: false,
  },
};