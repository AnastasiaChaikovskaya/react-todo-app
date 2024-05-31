import { LoginSchema } from '@/schema';
import * as z from 'zod';

export type TLoginFrom = z.infer<typeof LoginSchema>;
