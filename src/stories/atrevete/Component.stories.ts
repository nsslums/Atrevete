import type { Meta, StoryObj } from '@storybook/react';
import { Component } from './Component';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: 'Atrevete/Component',
  component: Component,
  tags: ['autodocs'],
} satisfies Meta<typeof Component>;

export default meta;
type Story = StoryObj<typeof meta>;


export const Default: Story = {
  args: {
    text: 'Template',
  }
}