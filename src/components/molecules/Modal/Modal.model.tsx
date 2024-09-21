export interface ModalProps {
  header?: string;
  children?: React.ReactNode;
  filterTournament: (min: number, max: number) => void;
}
