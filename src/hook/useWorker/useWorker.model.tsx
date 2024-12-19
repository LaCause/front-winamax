import { StructureTypes } from '../../components/molecules/ListStructure/ListStructure.model';
import { WorkerMessageTypes, WorkerMessageStates } from './useWokrer.const';

interface WorkerBaseMessage {
  key: string;
  listStructure: StructureTypes;
}
interface WorkerMessageOutputInterface extends WorkerBaseMessage {
  state: typeof WorkerMessageStates.WORKER_OUTPUT;
  type:
    | typeof WorkerMessageTypes.LOAD_DATA
    | typeof WorkerMessageTypes.FILTER_DATA;
  data: Tournament[] | Tournament[][];
  query: string;
}

interface WorkerMessageInputInterface extends WorkerBaseMessage {
  state: typeof WorkerMessageStates.WORKER_INPUT;
  type:
    | typeof WorkerMessageTypes.LOAD_DATA
    | typeof WorkerMessageTypes.FILTER_DATA;
  data: Tournament[];
  query: string;
}

export type WorkerMessage =
  | WorkerMessageInputInterface
  | WorkerMessageOutputInterface;

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
