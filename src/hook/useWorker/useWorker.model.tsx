import { StructureTypes } from '../../components/molecules/ListStructure/ListStructure.model';
import { QueryFilter } from '../useFilters/useFilters.model';

export const WORKER_KEY = 'worker-winamax-sny';

export const WorkerMessageTypes = {
  LOAD_DATA: 'LOAD_DATA',
  FILTER_DATA: 'FILTER_DATA',
  CLEAR_DATA: 'CLEAR_DATA',
  REFRESH_DATA: 'REFRESH_DATA',
} as const;

interface WorkerBaseMessage {
  key: string;
}

interface LoadDataMessage extends WorkerBaseMessage {
  type:
    | typeof WorkerMessageTypes.LOAD_DATA
    | typeof WorkerMessageTypes.REFRESH_DATA;
  data: Tournament[];
  query?: QueryFilter[];
}

interface FilterDataMessage extends WorkerBaseMessage {
  type: typeof WorkerMessageTypes.FILTER_DATA;
  query: string;
}

interface WorkerMessageOutputInterface {
  listStructure: StructureTypes;
  type:
    | typeof WorkerMessageTypes.LOAD_DATA
    | typeof WorkerMessageTypes.FILTER_DATA;
  data: Tournament[] | Tournament[][];
  query: string;
}

export type WorkerMessageInput = LoadDataMessage | FilterDataMessage;
export type WorkerMessageOutput = WorkerMessageOutputInterface;

export interface Tournament {
  tournamentId: number;
  name: string;
  icons: string[];
  nbPlayers: number;
  flag: string;
  limit: string;
  buyIn: number;
  prizepool: number;
  startDate: number;
}

export type Triple = Tournament[][];

export const MAX_TOURNAMENT_LIST = 350;

export enum TOURNAMENT_PRICES {
  MIN = 4,
  MAX = 10000,
}
