import { Tournament } from '../../../hook/useWorker/useWorker.model';

export interface TabProps {
  isActive?: boolean;
  hasInfoBox?: boolean;
  tournament: Tournament;
  onActiveTab?: (active: boolean, item: Tournament) => void;
}
