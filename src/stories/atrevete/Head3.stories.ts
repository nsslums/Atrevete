import type { Meta, StoryObj } from '@storybook/react';

import { Head3 } from './Head3';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: 'Atrevete/Head3',
  component: Head3,
  tags: ['autodocs'],
} satisfies Meta<typeof Head3>;

export default meta;
type Story = StoryObj<typeof meta>;


export const Default: Story = {
  args: {
    text: "見出し3",
  }
}