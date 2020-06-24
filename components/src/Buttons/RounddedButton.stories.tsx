import React from 'react';
import { RoundedButton } from './RoundedButton';
import { action } from '@storybook/addon-actions';

export default {
  title: 'Atoms | Buttons / RoundedButton',
  component: RoundedButton,
};

export const ContainedButton = () => {
  const onClick = action('onClick');
  return <RoundedButton onClick={onClick} label="Sign up" variant="contained"/>;
};

export const OutlinedButton = () => {
  const onClick = action('onClick');
  return <RoundedButton onClick={onClick} label="Sign up" variant="outlined"/>;
}