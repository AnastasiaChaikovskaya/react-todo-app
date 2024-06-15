import { ValueOf } from '@/helpers/utils';

export const ModalNames = {
  ADD_TO_DO: 'add-to-do',
  EDIT_TO_DO: 'edit-to-do',
  DELETE_TO_DO: 'delete-to-do',
  MORE_INFO: 'more-info',
} as const;

export type TModalNames = ValueOf<typeof ModalNames>;
