import { useState } from 'react';
import { Tab } from '../Tab/Tab';
import { ListStructureInterface, StructureTypes } from './ListStructure.model';
import { Tournament, Triple } from '../../../hook/useWorker/useWorker.model';

export const ListStructure: React.FC<ListStructureInterface> = ({
  type,
  items,
  onClick,
}) => {
  const [activeTab, setActiveTab] = useState<number[]>([]);

  const handleTabClick = (active: boolean, tournament?: Tournament): void => {
    if (!tournament?.tournamentId) return;

    setActiveTab((prevActiveTabs: number[]) => {
      const updatedActiveTabs = active
        ? [...prevActiveTabs, tournament.tournamentId]
        : prevActiveTabs.filter((id) => id !== tournament.tournamentId);

      onClick?.(updatedActiveTabs);
      return updatedActiveTabs;
    });
  };

  if (type === StructureTypes.GRID && items?.length) {
    const grid = items as Tournament[];
    return (
      <>
        {grid.map((item, id) =>
          item ? (
            <Tab
              key={id}
              onActiveTab={handleTabClick}
              isActive={activeTab.includes(item.tournamentId)}
              tournament={item}
            />
          ) : null,
        )}
      </>
    );
  } else if (type === StructureTypes.TRIPLE && items?.length) {
    const triple = items as Triple;

    return (
      <>
        <section className="flex flex-col gap-5">
          {triple.map((tournaments, index) => (
            <div key={index} className="flex flex-col gap-2">
              <h2>Group {index + 1}</h2>
              {tournaments
                ? tournaments.map((tournament, id) => (
                    <Tab
                      key={id}
                      onActiveTab={handleTabClick}
                      isActive={activeTab.includes(tournament.tournamentId)}
                      tournament={tournament}
                    />
                  ))
                : null}
            </div>
          ))}
        </section>
      </>
    );
  }
  return (
    <>
      <p className="text-center">Aucun résultats</p>
    </>
  );
};
