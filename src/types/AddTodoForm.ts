import { AddTodoSchema } from '@/schema';
import { z } from 'zod';

export type TAddTodoForm = z.infer<typeof AddTodoSchema>;
