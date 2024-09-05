import { useEffect, useState } from "react"
import { MAX_TOURNAMENT_LIST, Tournament } from "./useTournaments.model"
import { filterRules } from "./filterRules"

export const useTournaments = () => {
    const [tournamentList, setTournamentList] = useState<Tournament[]>()
    const [allTournamentList, setAllTournamentList] = useState<Tournament[]>()
    const [selectedTournaments, setSelectedTournaments] = useState<Tournament[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<any>()

    const addTournament = (tournament: Tournament): void | Tournament[] => {
        setSelectedTournaments([...selectedTournaments, tournament])    
    }

    const removeTournament = (tournament: Tournament) => {
        setSelectedTournaments((prevTournaments) => {
            const filteredTournaments = prevTournaments.filter(
                (selectedTournament) => selectedTournament.tournamentId !== tournament.tournamentId
            );
            return filteredTournaments;
        });
    }

    const filterTournament = (min: number, max: number) => {
        if (min > max) return setError('Erreur sur les filtres')
        const filtered = allTournamentList?.filter((tournament) => filterRules(tournament, min, max)).sort((a, b) => a.buyIn - b.buyIn)
        if (filtered) {
            setTournamentList(filtered)
            setLoading(false)
        }
    }

    useEffect(() => {
        const loadData = async (): Promise<void> => {
          const response = await fetch('/sample-poker.json')
          const data = await response.json() as Tournament[]
          
          if (response.ok && data.length) {
            setAllTournamentList(data)
            setTournamentList(data.splice(0, MAX_TOURNAMENT_LIST))
            setLoading(false)
          }
        }
        if (!tournamentList) {
            loadData()
        }
      }, [selectedTournaments])

    return {
        loading,
        error,
        tournamentList,
        selectedTournaments,
        addTournament,
        removeTournament,
        filterTournament
    }
}