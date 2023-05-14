import type { Meta, StoryObj } from '@storybook/react';

import { EventCard } from './EventCard';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: 'Atrevete/EventCard',
  component: EventCard,
  tags: ['autodocs'],
} satisfies Meta<typeof EventCard>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Active: Story = {
  args: {
    isActive: true,
    title: 'イベント名',
  },
};

export const Disable: Story = {
    args: {
        title: 'イベント名'
    }
}