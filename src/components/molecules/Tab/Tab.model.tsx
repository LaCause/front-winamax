import { Tournament } from '../../../hook/useTournaments/useTournaments.model';

export interface TabProps {
  isActive?: boolean;
  hasInfoBox?: boolean;
  tournament: Tournament;
  onActiveTab: (active: boolean, item: Tournament) => void;
}
