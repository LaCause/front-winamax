import { useState } from 'react';
import { Tournament } from '../../../hook/useTournaments/useTournaments.model';
import { Tab } from '../Tab/Tab';
import { ListStructureInterface, StructureTypes } from './ListStructure.model';

export const ListStructure: React.FC<ListStructureInterface> = ({
  type,
  items,
  onClick,
}) => {
  const [activeTab, setActiveTab] = useState<number[]>([]);

  /**
   * Handles the click event of a tab. If the tab is active, the tournament id
   * is added to the active tabs array. If the tab is inactive, the tournament id
   * is removed from the active tabs array.
   *
   * @param {boolean} active - Whether the tab is active or not.
   * @param {Tournament | undefined} tournament - The tournament object associated with the tab.
   * @returns {void}
   */
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
    return (
      <>
        {items.map((item, id) =>
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
  }
  return <>LIST</>;
};
