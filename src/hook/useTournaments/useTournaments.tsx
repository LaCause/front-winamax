import { useEffect, useState } from "react"
import { MAX_TOURNAMENT_LIST, Tournament } from "./useTournaments.model"

export const useTournaments = () => {
    const [tournamentList, setTournamentList] = useState<Tournament[]>()
    const [allTournamentList, setAllTournamentList] = useState<Tournament[]>()
    const [selectedTournaments, setSelectedTournaments] = useState<Tournament[]>([])

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

    useEffect(() => {
        const loadData = async (): Promise<void> => {
          const response = await fetch('/sample-poker.json')
          const data = await response.json() as Tournament[]
          
          if (response.ok && data.length) {
            setAllTournamentList(data)
            setTournamentList(data.splice(0, MAX_TOURNAMENT_LIST))
          }
        }
        loadData()
        console.log(selectedTournaments)
      }, [selectedTournaments])

    return {
        tournamentList,
        selectedTournaments,
        addTournament,
        removeTournament
    }
}