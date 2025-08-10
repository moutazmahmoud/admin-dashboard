import { create } from "zustand";

type ModalType = "logout" | "delete" | "custom" | null;

interface ModalState {
  isOpen: boolean;
  type: ModalType;
  title?: string;
  content?: React.ReactNode;
  confirmText?: string;
  onConfirm?: () => void;
  openModal: (params: {
    type: ModalType;
    title?: string;
    content?: React.ReactNode;
    confirmText?: string;
    onConfirm?: () => void;
  }) => void;
  closeModal: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  isOpen: false,
  type: null,
  title: "",
  content: null,
  confirmText: "Confirm",
  onConfirm: undefined,

  openModal: ({ type, title, content, confirmText, onConfirm }) =>
    set({
      isOpen: true,
      type,
      title,
      content,
      confirmText,
      onConfirm,
    }),

  closeModal: () =>
    set({
      isOpen: false,
      type: null,
      title: "",
      content: null,
      confirmText: "Confirm",
      onConfirm: undefined,
    }),
}));
