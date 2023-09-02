import type { Meta, StoryObj } from '@storybook/react';

import { Head1 } from './Head1';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: 'Atrevete/Head1',
  component: Head1,
  tags: ['autodocs'],
} satisfies Meta<typeof Head1>;

export default meta;
type Story = StoryObj<typeof meta>;


export const Default: Story = {
  args: {
    text: '見出し１',
  }
}