import type { Meta, StoryObj } from '@storybook/react';

import { SimpleButton } from './SimpleButton';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: 'Atrevete/SimpleButton',
  component: SimpleButton,
  tags: ['autodocs'],
} satisfies Meta<typeof SimpleButton>;

export default meta;
type Story = StoryObj<typeof meta>;


export const Default: Story = {
  args: {
    text: 'More',
  }
}