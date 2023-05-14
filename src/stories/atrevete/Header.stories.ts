import type { Meta, StoryObj } from '@storybook/react';

import { Header } from './Header';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: 'Atrevete/Header',
  component: Header,
  tags: ['autodocs'],
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;


export const Default: Story = {
  args: {
    menuOpen: false
  }
}

export const MenuOpen: Story = {
  args: {
    menuOpen: true
  }
}