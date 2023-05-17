import type { Meta, StoryObj } from '@storybook/react';
import { MenuLink } from './MenuLink';

const meta = {
  title: 'Atrevete/MenuLink',
  component: MenuLink,
  tags: ['autodocs'],
} satisfies Meta<typeof MenuLink>;

export default meta;
type Story = StoryObj<typeof meta>;


export const Default: Story = {
  args: {
    text: 'Link',
  }
}