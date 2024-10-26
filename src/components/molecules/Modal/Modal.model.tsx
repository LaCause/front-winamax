export interface ModalHandle {
  openModal: () => void;
  closeModal: () => void;
}
export interface ModalProps {
  isOpen: boolean;
  header?: React.ReactNode;
  content: React.ReactNode;
  footer?: React.ReactNode;
}
