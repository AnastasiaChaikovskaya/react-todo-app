import { create } from 'zustand';

interface IModalStore {
  isEditModal: boolean;
  isMoreInfoModal: boolean;
  isCreateModal: boolean;
  setEditModal: (isModal: boolean) => void;
  setMoreInfoModal: (isModal: boolean) => void;
  setCreateModal: (isModal: boolean) => void;
}

const initModalState = {
  isEditModal: false,
  isMoreInfoModal: false,
  isCreateModal: false,
};

export const useModalStore = create<IModalStore>((set) => ({
  ...initModalState,
  setEditModal: (isModal: boolean) => set((state) => ({ ...state, isEditModal: isModal })),
  setMoreInfoModal: (isModal: boolean) => set((state) => ({ ...state, isMoreInfoModal: isModal })),
  setCreateModal: (isModal: boolean) => set((state) => ({ ...state, isCreateModal: isModal })),
}));
