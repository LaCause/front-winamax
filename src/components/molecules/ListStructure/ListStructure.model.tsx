import { Tournament, Triple } from '../../../hook/useWorker/useWorker.model';

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
  items: Tournament[] | Triple;
  onClick?: (item: number[]) => void;
}
