import {
  FormControl,
  InputLabel,
  MenuItem,
  Select as MuiSelect,
  SelectProps,
} from '@mui/material';
import { useId, forwardRef } from 'react';

type Props = SelectProps & {
  options: string[];
};

export const Select = forwardRef<HTMLSelectElement, Props>(
  ({ options, label, ...props }, ref) => {
    const id = useId();
    return (
      <FormControl>
        <InputLabel id={id}>{label}</InputLabel>
        <MuiSelect
          id={id}
          label={label}
          ref={ref}
          defaultValue={props.value}
          {...props}
        >
          {options.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </MuiSelect>
      </FormControl>
    );
  },
);

Select.displayName = 'Select';
