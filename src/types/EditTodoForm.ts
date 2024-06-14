import { EditTodoSchema } from '@/schema';
import { z } from 'zod';

export type TEditTodoForm = z.infer<typeof EditTodoSchema>;
