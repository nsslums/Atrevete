import type { Meta, StoryObj } from '@storybook/react';

import { GoldButton } from './GoldButton';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: 'Atrevete/GoldBtn',
  component: GoldButton,
  tags: ['autodocs'],
} satisfies Meta<typeof GoldButton>;

export default meta;
type Story = StoryObj<typeof meta>;


export const Default: Story = {
  args: {
    text: 'More',
  }
}