import { useCallback, useEffect, useState } from 'react';
import { MAX_TOURNAMENT_LIST, Tournament } from './useTournaments.model';
import { useWorker, WorkerMessage } from '../useWorker/useWorker';
import { WorkerMessageTypes } from '../useWorker/worker-winamax';

export const useTournaments = (): {
  isProcessing: boolean;
  tournamentList?: Tournament[];
  runWorkerWithFilter: () => void;
} => {
  const [tournaments, setTournaments] = useState<Tournament[]>();
  const [workerCalled, setWorkerCalled] = useState(false);
  const [processing, setProcessing] = useState(true);

  const handleWorkerMessage = ({
    type = WorkerMessageTypes.LOAD_DATA,
    data,
  }: WorkerMessage): void => {
    switch (type) {
      case WorkerMessageTypes.FILTER_DATA: {
        break;
      }
      default:
        if (data && data.length) {
          setTournaments(data.slice(0, MAX_TOURNAMENT_LIST));
          setProcessing(false);
        }
        break;
    }
  };

  const { runWorker, loadData, getData, clearWorker } =
    useWorker(handleWorkerMessage);

  const runWorkerWithFilter = () => {};

  useEffect(() => {
    if (!getData() && !tournaments) {
      loadData();
    }

    if (!workerCalled && tournaments && tournaments.length > 0) {
      setProcessing(false);
      setWorkerCalled(true);
    }
  }, [tournaments]);

  return {
    isProcessing: processing,
    tournamentList: tournaments,
    runWorkerWithFilter,
  };
};
