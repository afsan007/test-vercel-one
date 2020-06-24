import React from 'react';
import Button from '@material-ui/core/Button';

export interface RoundedButtonProps {
  onClick: () => void;
  label: string;
  variant: 'contained' | 'outlined';
}

export const RoundedButton = ({label, onClick, variant}: RoundedButtonProps) => {
  return (
    <Button onClick={onClick} variant={variant} color="primary">
      {label}
    </Button>
  );
}
