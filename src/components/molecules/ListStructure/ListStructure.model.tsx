import { Tournament } from '../../../hook/useTournaments/useTournaments.model';

export enum StructureTypes {
  GRID = 'grid',
  LIST = 'list',
  TRIPLE = 'triple',
}

type ListStructureType =
  | StructureTypes.GRID
  | StructureTypes.LIST
  | StructureTypes.TRIPLE;

export interface ListStructureInterface {
  type: ListStructureType;
  items: Tournament[];
  onClick?: (item: number[]) => void;
}
