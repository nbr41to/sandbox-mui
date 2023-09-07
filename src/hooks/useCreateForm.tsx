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
  age: z.coerce.number(),
  plan: z.enum(['basic', 'pro', 'premium']),
});

export type CreateFormValues = z.infer<typeof schema>;

export const useCreateForm = () =>
  useForm<CreateFormValues>({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      age: 0,
      plan: 'basic',
    },
    resolver: zodResolver(schema),
  });
