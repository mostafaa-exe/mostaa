import {z} from 'zod';

export const submitSchema = z.object({
  type: z.enum(['tool', 'prompt', 'workflow']),
  title: z.string().min(3),
  description: z.string().min(10),
  url: z.string().url().optional().or(z.literal('')),
  email: z.string().email().optional().or(z.literal(''))
});
