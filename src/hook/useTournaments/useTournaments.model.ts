export interface Tournament {
    tournamentId: number
    name: string
    icons: string[]
    nbPlayers: number
    flag: string
    limit: string
    buyIn: number
    prizepool: number
    startDate: string
  }

export const MAX_TOURNAMENT_LIST = 350