import { forwardRef } from 'react';
import { TextField, TextFieldProps } from '@mui/material';

type Props = Omit<TextFieldProps, 'type'> & {
  type?: 'text' | 'email';
};

export const TextInput = forwardRef<HTMLInputElement, Props>(
  ({ type = 'text', ...props }, ref) => {
    return <TextField type={type} inputRef={ref} {...props} />;
  },
);

TextInput.displayName = 'TextInput';
