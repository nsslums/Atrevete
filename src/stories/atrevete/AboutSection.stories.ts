import type { Meta, StoryObj } from '@storybook/react';
import { AboutSection } from './AboutSection';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: 'Atrevete/AboutSection',
  component: AboutSection,
  tags: ['autodocs'],
} satisfies Meta<typeof AboutSection>;

export default meta;
type Story = StoryObj<typeof meta>;


export const Default: Story = {
  args: {
    text: '<p>Text</p>',
    image: 'top.jpg',
    oneWord:'ここに一言'
  }
}