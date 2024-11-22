import { Tournament } from '../../../hook/useTournaments/useTournaments.model';
import { Tab } from '../../molecules/Tab/Tab';

interface TabListProps {
  loading: boolean;
  selectedTournaments: Tournament[];
  tripleTournamentList?: Tournament[][] | undefined;
  tournamentList: Tournament[] | undefined;
  addTournament: (tournament: Tournament) => void | Tournament[];
  removeTournament: (tournament: Tournament) => void;
}

export const TabList: React.FC<TabListProps> = ({
  selectedTournaments,
  addTournament,
  tournamentList,
  removeTournament,
}) => {
  return (
    <>
      {tournamentList?.map((tournament, id) => (
        <Tab
          key={id}
          tournament={tournament}
          selectedTournaments={selectedTournaments}
          addTournament={addTournament}
          removeTournament={removeTournament}
        />
      ))}
    </>
  );
};
