import { useEffect, useState } from 'react';
import {
  MAX_TOURNAMENT_LIST,
  Tournament,
  Triple,
} from './useTournaments.model';
import {
  FilterTypes,
  QUERY_FILTER_TYPES,
  QueryFilter,
  useWorker,
  WorkerMessage,
} from '../useWorker/useWorker';
import { WorkerMessageTypes } from '../useWorker/worker-winamax';
import { StructureTypes } from '../../components/molecules/ListStructure/ListStructure.model';
import { useSearchParams } from 'react-router-dom';

export const useTournaments = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [structureType, setStructureType] = useState<StructureTypes>(
    StructureTypes.GRID,
  );
  const [tournaments, setTournaments] = useState<Tournament[] | Triple>();
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string>();
  const hasFilters = Boolean(searchParams.get('filters'));

  const handleWorkerMessage = ({
    type = WorkerMessageTypes.LOAD_DATA,
    data,
  }: WorkerMessage): void => {
    switch (type) {
      case WorkerMessageTypes.FILTER_DATA: {
        setStructureType(StructureTypes.TRIPLE);
        setTournaments(data);
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

  const filterData = async () => {
    const filters = searchParams.get('filters');
    if (!filters || !filters?.length) return setError('No filters');

    const query = filters.split('&').map((filter): QueryFilter => {
      const [code, value] = filter.split('=');

      const getFilterType = (code: string): QUERY_FILTER_TYPES => {
        if (code === 'buyIn') return QUERY_FILTER_TYPES.RANGE;
        if (code === 'triple') return QUERY_FILTER_TYPES.BOOLEAN;
        return QUERY_FILTER_TYPES.BOOLEAN;
      };

      return { code, type: getFilterType(code), value };
    });

    setProcessing(true);
    runWorker({
      type: WorkerMessageTypes.FILTER_DATA,
      query,
      data: getData(),
    });
  };

  useEffect(() => {
    if (hasFilters) {
      filterData();
      setProcessing(false);
    }
  }, [searchParams]);

  return {
    processing,
    structureType,
    tournaments,
    error,
    filterData,
  };
};
