import { useState } from 'react';
import { Tournament } from '../../../hook/useTournaments/useTournaments.model';
import { TabList } from '../../organisms/TabList/TabList';
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
  onClick: (active: boolean, item: Tournament) => void;
}

export const ListStructure: React.FC<ListStructure> = ({
  type,
  items,
  onClick,
}) => {
  const [activeTab, setActiveTab] = useState<number[]>([]);

  const handleActiveTab = (active: boolean, item: Tournament) => {
    setActiveTab((prevActiveTab) => {
      if (active) {
        return [...prevActiveTab, item.tournamentId];
      } else {
        return prevActiveTab.filter((id) => id !== item.tournamentId);
      }
    });
  };

  if (type === StructureTypes.GRID) {
    return (
      <>
        {items.length &&
          items?.map((item, id) => {
            return (
              <>
                <Tab
                  key={id}
                  onActiveTab={handleActiveTab}
                  isActive={activeTab.includes(item.tournamentId)}
                  tournament={item}
                />
              </>
            );
          })}
      </>
    );
  }
  return <>LIST</>;
};
