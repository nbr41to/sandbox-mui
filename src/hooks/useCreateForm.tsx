import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const schema = z.object({
  firstName: z
    .string()
    .min(2, { message: '2文字以上で' })
    .max(10, { message: '10文字以下で(^ω^)' }),
  lastName: z
    .string()
    .min(2, { message: '2文字以上で' })
    .max(10, { message: '10文字以下で(^ω^)' }),
  email: z.string().email({ message: 'ちゃんとした形式で' }),
  age: z.coerce.number().positive().int(),
});
export type CreateFormValues = z.infer<typeof schema>;
export const useCreateForm = () =>
  useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      age: 0,
    },
    resolver: zodResolver(schema),
  });
