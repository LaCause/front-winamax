import { useEffect, useState } from 'react';
import { MAX_TOURNAMENT_LIST, Tournament } from './useTournaments.model';
import { useWorker } from '../useWorker/useWorker';
import { useResolvedPath } from 'react-router-dom';

export const useTournaments = () => {
  const [tournamentList, setTournamentList] = useState<Tournament[]>();
  const [isWorkerCalled, setIsWorkerCalled] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState(true);

  const onMessage = (data: any) => {
    console.log('onmessage');
    if (data && data.length) {
      setTournamentList(data.splice(0, 1));
    }
  };

  const { runWorker, loadData, getData } = useWorker(onMessage);

  useEffect(() => {
    if (!tournamentList) {
      loadData();
    }

    if (!isWorkerCalled && tournamentList && tournamentList.length > 0) {
      runWorker(tournamentList);
      setIsProcessing(false);
      setIsWorkerCalled(true);
    }
    console.log('use effect');
  }, [tournamentList]);

  return {
    isProcessing,
    tournamentList,
  };
};
