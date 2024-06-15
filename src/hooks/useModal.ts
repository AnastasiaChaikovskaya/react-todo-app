import { ModalNames, TModalNames } from '@/constants/modals';
import { useModalStore } from '@/store/ModalStore';
import { useCallback, useMemo } from 'react';

type TUseModal = (modalName: TModalNames) => {
  /**
   * Visibility state for desired modal.
   */
  isOpen: boolean;
  /**
   * Handler function that will close desired modal.
   */
  closeModal: () => void;
  /**
   * Handler function that will open desired modal.
   */
  openModal: () => void;
  /**
   * Handler function that will toggle desired modal.
   */
  toggleModal: (open: boolean) => void;
};

export const useModal: TUseModal = (modalName) => {
  const {
    isCreateModal,
    isEditModal,
    isMoreInfoModal,
    isDeleteModal,
    setCreateModal,
    setEditModal,
    setMoreInfoModal,
    setDeleteModal,
  } = useModalStore((state) => state);

  const isOpen = useMemo(() => {
    switch (modalName) {
      case ModalNames.ADD_TO_DO:
        return isCreateModal;
      case ModalNames.EDIT_TO_DO:
        return isEditModal;
      case ModalNames.DELETE_TO_DO:
        return isDeleteModal;
      case ModalNames.MORE_INFO:
        return isMoreInfoModal;
      default: {
        throw new Error('Unknown modal name');
      }
    }
  }, [modalName, isCreateModal, isEditModal, isMoreInfoModal, isDeleteModal]);

  const openModal = useCallback(() => {
    switch (modalName) {
      case ModalNames.ADD_TO_DO:
        setCreateModal(true);
        break;
      case ModalNames.EDIT_TO_DO:
        setEditModal(true);
        break;
      case ModalNames.DELETE_TO_DO:
        setDeleteModal(true);
        break;
      case ModalNames.MORE_INFO:
        setMoreInfoModal(true);
        break;
      default: {
        throw new Error('Unknown modal name');
      }
    }
  }, [setCreateModal, setEditModal, setMoreInfoModal, setDeleteModal, modalName]);

  const closeModal = useCallback(() => {
    switch (modalName) {
      case ModalNames.ADD_TO_DO:
        setCreateModal(false);
        break;
      case ModalNames.EDIT_TO_DO:
        setEditModal(false);
        break;
      case ModalNames.DELETE_TO_DO:
        setDeleteModal(false);
        break;
      case ModalNames.MORE_INFO:
        setMoreInfoModal(false);
        break;
      default: {
        throw new Error('Unknown modal name');
      }
    }
  }, [setCreateModal, setEditModal, setMoreInfoModal, setDeleteModal, modalName]);

  const toggleModal = useCallback(
    (open: boolean) => {
      switch (modalName) {
        case ModalNames.ADD_TO_DO:
          setCreateModal(open);
          break;
        case ModalNames.EDIT_TO_DO:
          setEditModal(open);
          break;
        case ModalNames.DELETE_TO_DO:
          setDeleteModal(open);
          break;
        case ModalNames.MORE_INFO:
          setMoreInfoModal(open);
          break;
        default: {
          throw new Error('Unknown modal name');
        }
      }
    },
    [setCreateModal, setEditModal, setMoreInfoModal, setDeleteModal, modalName],
  );

  return {
    isOpen,
    openModal,
    closeModal,
    toggleModal,
  };
};
