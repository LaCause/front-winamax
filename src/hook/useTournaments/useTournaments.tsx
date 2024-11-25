import { useEffect, useState } from 'react';
import { MAX_TOURNAMENT_LIST, Tournament } from './useTournaments.model';
import { useWorker } from '../useWorker/useWorker';
import { useResolvedPath } from 'react-router-dom';

/**
 * A hook that fetches the tournament list from the worker and sets it in state.
 * It also keeps track of whether the worker has been called and whether it is still processing.
 * The hook returns an object with the tournament list and two booleans indicating whether the worker is still processing and whether it has been called or not.
 * @returns {{isProcessing: boolean, tournamentList?: Tournament[]}}
 */
export const useTournaments = (): {
  isProcessing: boolean;
  tournamentList?: Tournament[];
} => {
  const [tournaments, setTournaments] = useState<Tournament[]>();
  const [workerCalled, setWorkerCalled] = useState(false);
  const [processing, setProcessing] = useState(true);

  const handleWorkerMessage = (data: Tournament[]): void => {
    if (data && data.length) {
      setTournaments(data.slice(0, MAX_TOURNAMENT_LIST));
    }
  };

  const { runWorker, loadData } = useWorker(handleWorkerMessage);

  useEffect(() => {
    if (!tournaments) {
      loadData();
    }

    if (!workerCalled && tournaments && tournaments.length > 0) {
      runWorker(tournaments);
      setProcessing(false);
      setWorkerCalled(true);
    }
  }, [tournaments]);

  return {
    isProcessing: processing,
    tournamentList: tournaments,
  };
};
