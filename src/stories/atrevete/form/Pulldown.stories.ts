import type { Meta, StoryObj } from '@storybook/react';
import { Pulldown } from './Pulldown';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: 'Atrevete/Pulldown',
  component: Pulldown,
  tags: ['autodocs'],
} satisfies Meta<typeof Pulldown>;

export default meta;
type Story = StoryObj<typeof meta>;


export const Default: Story = {
  args: {
    label: "イベント名",
    name: 'event',
    id: 'event',
  }
}