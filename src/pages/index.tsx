import { Button, TextField, Stack, Container, Box } from '@mui/material';

import { CreateFormValues, useCreateForm } from '@/hooks/useCreateForm';
import { Select } from '@/components/Select';
import { useState } from 'react';
import { Controller } from 'react-hook-form';

export default function Home() {
  const [payload, setPayload] = useState<CreateFormValues>();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    control,
  } = useCreateForm();

  const handleOnSubmit = (data: CreateFormValues) => {
    setPayload(data);
  };
  const handleOnError = (errors: any) => {
    console.error(errors);
  };
  console.log('render');

  return (
    <Container>
      <Box maxWidth='sm'>
        <h1>MUI EXAMPLE</h1>
      </Box>
      <Container maxWidth='sm'>
        <form onSubmit={handleSubmit(handleOnSubmit, handleOnError)}>
          <Stack spacing={2}>
            <TextField
              id='firstName'
              label='firstName'
              error={Boolean(errors.firstName)}
              helperText={errors.firstName?.message}
              {...register('firstName')}
            />
            <Controller
              name='lastName'
              control={control}
              render={({ field }) => (
                <TextField
                  label='lastName'
                  error={Boolean(errors.lastName)}
                  helperText={errors.lastName?.message}
                  {...field}
                />
              )}
            />
            {/* <TextField
              label='lastName'
              error={Boolean(errors.lastName)}
              helperText={errors.lastName?.message}
              {...register('lastName')}
            /> */}
            <TextField
              label='email'
              error={Boolean(errors.email)}
              helperText={errors.email?.message}
              {...register('email')}
            />
            <TextField
              label='age'
              type='number'
              error={Boolean(errors.age)}
              helperText={errors.age?.message}
              {...register('age')}
            />
            {/* Labelが壊れているので,FormControlで作ったほうが良さそう */}
            {/* <MuiSelect label='plan' defaultValue='basic' {...register('plan')}>
                <MenuItem value='basic'>basic</MenuItem>
                <MenuItem value='pro'>pro</MenuItem>
                <MenuItem value='premium'>premium</MenuItem>
              </MuiSelect> */}
            <Select
              variant='outlined'
              label='plan'
              options={['basic', 'pro', 'premium']}
              defaultValue='basic'
              {...register('plan')}
            />
          </Stack>
          <Button type='submit' variant='outlined'>
            Submit
          </Button>
          <Button
            variant='outlined'
            onClick={() => {
              setValue('firstName', 'tit');
              setValue('lastName', 'tat');
              setValue('email', 'example@example.com');
              setValue('age', 20);
              setValue('plan', 'pro');
            }}
          >
            setValue
          </Button>
          <Button
            variant='outlined'
            onClick={() => {
              setPayload(undefined);
              reset();
            }}
          >
            reset
          </Button>
        </form>
      </Container>

      {payload && (
        <Container>
          <p>payload</p>
          <pre className='bg-slate-800 text-white py-4 px-6 rounded'>
            {JSON.stringify(payload, null, 2)}
          </pre>
        </Container>
      )}
    </Container>
  );
}
