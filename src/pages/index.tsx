import { Button, TextField, Stack, Container, Box } from '@mui/material';
import { CreateFormValues, useCreateForm } from '@/hooks/useCreateForm';

export default function Home() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useCreateForm();
  const handleOnSubmit = (data: CreateFormValues) => {
    console.log(data);
  };
  const handleOnError = (errors: any) => {
    console.error(errors);
  };

  return (
    <Container>
      <Box maxWidth='sm'>
        <h1>MUI EXAMPLE</h1>
      </Box>
      <Container maxWidth='sm'>
        <form onSubmit={handleSubmit(handleOnSubmit, handleOnError)}>
          <Stack spacing={2}>
            <TextField
              label='firstName'
              error={Boolean(errors.firstName)}
              helperText={errors.firstName?.message}
              {...register('firstName')}
            />
            <TextField
              label='lastName'
              error={Boolean(errors.lastName)}
              helperText={errors.lastName?.message}
              {...register('lastName')}
            />
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
          </Stack>
          <Button type='submit' variant='outlined'>
            Submit
          </Button>
        </form>
      </Container>
    </Container>
  );
}
