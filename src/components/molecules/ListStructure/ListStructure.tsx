import { useState } from 'react';
import { Tournament } from '../../../hook/useTournaments/useTournaments.model';
import { Tab } from '../Tab/Tab';

export enum StructureTypes {
  GRID = 'grid',
  LIST = 'list',
  TRIPLE = 'triple',
}

type ListStructureType =
  | StructureTypes.GRID
  | StructureTypes.LIST
  | StructureTypes.TRIPLE;

export interface ListStructure {
  type: ListStructureType;
  items: Tournament[];
  onClick?: (item: number[]) => void;
}

export const ListStructure: React.FC<ListStructure> = ({
  type,
  items,
  onClick,
}) => {
  const [activeTab, setActiveTab] = useState<number[]>([]);

  const handleActiveTab = (active: boolean, item?: Tournament) => {
    if (!item || !item.tournamentId) return;
    setActiveTab((prevActiveTab) => {
      const updatedTab = active
        ? [...prevActiveTab, item.tournamentId]
        : prevActiveTab.filter((id) => id !== item.tournamentId);

      onClick?.(updatedTab);
      return updatedTab;
    });
  };

  if (type === StructureTypes.GRID && items?.length) {
    return (
      <>
        {items.map((item, id) =>
          item ? (
            <Tab
              key={id}
              onActiveTab={handleActiveTab}
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
