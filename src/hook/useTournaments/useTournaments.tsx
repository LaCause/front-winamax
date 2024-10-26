import { useEffect, useState } from 'react';
import { MAX_TOURNAMENT_LIST, Tournament } from './useTournaments.model';
import { useWorker } from '../useWorker/useWorker';

// Filtrer les 350 premiers résultats : OK
// partir des données des 350 premiers tournois présents sur la plateforme,
// - l'utilisateur aimerait trouver l'ensemble des combinaisons de 3 tournois (triplets), dont le buy-in total est compris entre X et Y.
// - Il n'est pas possible de mettre en triplet des tournois qui commencent à moins d'1h d'intervalle.
// - Les résultats doivent être affichés par groupes de 3 tournois et triés par buy-in total croissant. - L'algorithme de détection des triplets doit être optimisé."

export const useTournaments = () => {
  const [tournamentList, setTournamentList] = useState<Tournament[]>();
  const [allTournamentList, setAllTournamentList] = useState<Tournament[]>();
  const [selectedTournaments, setSelectedTournaments] = useState<Tournament[]>(
    [],
  );
  const [isProcessing, setIsProcessing] = useState(false);
  const [min, setMin] = useState<number>(0);
  const [max, setMax] = useState<number>(10000);

  const onMessage = (data: any) => {
    setTournamentList(data);
    setIsProcessing(true);
  };

  const { runWorker } = useWorker(onMessage);

  const addTournament = (tournament: Tournament): void | Tournament[] => {
    setSelectedTournaments([...selectedTournaments, tournament]);
  };

  const removeTournament = (tournament: Tournament) => {
    setSelectedTournaments((prevTournaments) => {
      const filteredTournaments = prevTournaments.filter(
        (selectedTournament) =>
          selectedTournament.tournamentId !== tournament.tournamentId,
      );
      return filteredTournaments;
    });
  };

  const filterTournament = (data: Tournament[]) => {
    setMin(min);
    setMax(max);
    runWorker(data);
  };

  const loadData = async (): Promise<void> => {
    const response = (await import('../../../sample-poker.json')).default;
    if (response && response.length) {
      setAllTournamentList(response);
      setTournamentList(response.splice(0, MAX_TOURNAMENT_LIST));
      setIsProcessing(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return {
    isProcessing,
    tournamentList,
    selectedTournaments,
    allTournamentList,
    addTournament,
    removeTournament,
    filterTournament,
    min,
    max,
  };
};
