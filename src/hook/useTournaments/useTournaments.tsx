import { useEffect, useState } from 'react';
import { MAX_TOURNAMENT_LIST, Tournament } from './useTournaments.model';
import { QueryFilter, useWorker, WorkerMessage } from '../useWorker/useWorker';
import { WorkerMessageTypes } from '../useWorker/worker-winamax';

export const useTournaments = () => {
  const [tournaments, setTournaments] = useState<Tournament[]>();
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string>();

  const handleWorkerMessage = ({
    type = WorkerMessageTypes.LOAD_DATA,
    data,
  }: WorkerMessage): void => {
    switch (type) {
      case WorkerMessageTypes.FILTER_DATA: {
        setProcessing(false);
        break;
      }
      default:
        if (data) {
          setTournaments(data.slice(0, MAX_TOURNAMENT_LIST));
          setProcessing(false);
        }
        break;
    }
  };

  const { getData, runWorker } = useWorker(handleWorkerMessage);

  const filterData = (filters?: QueryFilter[]) => {
    if (!filters || !filters?.length) return setError('No filters');
    setProcessing(true);
    runWorker({
      type: WorkerMessageTypes.FILTER_DATA,
      query: filters,
      data: getData(),
    });
  };

  return {
    processing,
    tournaments,
    error,
    filterData,
  };
};
