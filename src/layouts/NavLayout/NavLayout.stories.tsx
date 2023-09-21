import { ComponentStory, ComponentMeta } from '@storybook/react';
import NavLayout from './index';

export default {
  title: 'Formalhaut/Layouts/NavLayout',
  component: NavLayout,
  argTypes: {},
} as ComponentMeta<typeof NavLayout>;

const Template: ComponentStory<typeof NavLayout> = (args) => <NavLayout {...args} />;

export const Default = Template.bind({});
Default.args = {};