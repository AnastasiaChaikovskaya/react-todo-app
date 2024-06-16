import { UpdatePassWordSchema } from '@/schema';
import { z } from 'zod';

export type TUpdatePasswordForm = z.infer<typeof UpdatePassWordSchema>;
