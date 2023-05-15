import type { Meta, StoryObj } from '@storybook/react';

import { Head2 } from './Head2';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: 'Atrevete/Head2',
  component: Head2,
  tags: ['autodocs'],
} satisfies Meta<typeof Head2>;

export default meta;
type Story = StoryObj<typeof meta>;


export const Default: Story = {
  args: {
    text: "見出し3",
  }
}