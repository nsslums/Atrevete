import { Meta, StoryObj } from "@storybook/react";
import { EventStatus } from "./EventStatus";

const meta = {
    title: 'Atrevete/EventStatus',
    component: EventStatus,
    tags: ['autodocs'],
} satisfies Meta<typeof EventStatus>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Active: Story = {
  args: {
    isActive: true,
  },
};

export const Disable: Story = {
  args: {
    isActive: false,
  },
};