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
  tripleTournamentList,
  addTournament,
  tournamentList,
  removeTournament,
}) => {
  if (tripleTournamentList && tripleTournamentList.length) {
    return (
      <>
        {tripleTournamentList.map((tripleTournament, index) => (
          <div key={index} className="py-2">
            <h3 className="text-xl text-center">Triplet : {index}</h3>
            <ul className="flex flex-col gap-3">
              {tripleTournament.map((tournament, id) => (
                <Tab
                  key={id}
                  tournament={tournament}
                  selectedTournaments={selectedTournaments}
                  addTournament={addTournament}
                  removeTournament={removeTournament}
                />
              ))}
            </ul>
          </div>
        ))}
      </>
    );
  }

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
