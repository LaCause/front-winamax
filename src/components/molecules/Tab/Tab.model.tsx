import { Tournament } from "../../../hook/useTournaments/useTournaments.model"

export interface TabProps {
    isActive?: boolean
    hasInfoBox?: boolean
    selectedTournaments?: Tournament[]
    addTournament: (tournament: Tournament) => void
    removeTournament: (tournament: Tournament) => void
    tournament: Tournament
}