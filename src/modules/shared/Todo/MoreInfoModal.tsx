import React, { FC } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ITodo } from '@/types/Todo';
import { useParams } from 'react-router-dom';

interface IMoreInfoModal {
  todo: ITodo;
}

const MoreInfoModal: FC<IMoreInfoModal> = () => {
  const { todoId } = useParams();
  return (
    <Dialog>
      <DialogContent>
        <DialogHeader>
          <DialogTitle></DialogTitle>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default MoreInfoModal;
