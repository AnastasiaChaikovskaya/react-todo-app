import { RegisterSchema } from '@/schema';
import * as z from 'zod';

export type TRegisterFrom = z.infer<typeof RegisterSchema>;
