export interface Tournament {
  tournamentId: number;
  name: string;
  icons: string[];
  nbPlayers: number;
  flag: string;
  limit: string;
  buyIn: number;
  prizepool: number;
  startDate: string;
}

export const MAX_TOURNAMENT_LIST = 350;

export enum TOURNAMENT_PRICES {
  MIN = 4,
  MAX = 10000,
}
