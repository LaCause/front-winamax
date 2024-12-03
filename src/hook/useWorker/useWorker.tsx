import { useRef, useEffect, useState, useCallback } from 'react';
import { Tournament } from '../useTournaments/useTournaments.model';
import { WorkerMessageTypes } from './worker-winamax';

export type QueryFilter = {
  code: string;
  value: string;
};

interface WorkerMessageType {
  type: WorkerMessageTypes;
}

interface WorkerMessageLoadData extends WorkerMessageType {
  type: WorkerMessageTypes.LOAD_DATA | WorkerMessageTypes.REFRESH_DATA;
  data: Tournament[];
  query?: QueryFilter[];
}

interface WorkerMessageFilterData extends WorkerMessageType {
  type: WorkerMessageTypes.FILTER_DATA;
  data?: Tournament[];
  query: QueryFilter[];
}

export type WorkerMessage = WorkerMessageLoadData | WorkerMessageFilterData;

export const useWorker = (onMessage: (data: WorkerMessage) => void) => {
  const [data, setData] = useState<Tournament[]>();
  const workerRef = useRef<Worker>();

  const runWorker = ({ type, data, query }: WorkerMessage) => {
    if (!type) throw new Error('Worker message type is required');
    if (workerRef.current) {
      if (
        type === WorkerMessageTypes.LOAD_DATA ||
        type === WorkerMessageTypes.REFRESH_DATA
      ) {
        workerRef.current.postMessage({
          type,
          data,
        });
        workerRef.current.onmessage = (e) => {
          onMessage({
            type: WorkerMessageTypes.LOAD_DATA,
            data: e.data,
          });
        };
      } else if (type === WorkerMessageTypes.FILTER_DATA) {
        if (query) {
          workerRef.current.postMessage({
            type,
            data,
            query,
          } as WorkerMessageFilterData);
        }
      }
    }
  };

  const clearWorker = () => {
    if (workerRef.current) {
      workerRef.current.terminate();
    }
  };

  const loadData = useCallback(async () => {
    const response = await fetch('./sample-poker.json');
    const tournaments = await response.json();
    if (tournaments) {
      workerRef.current?.postMessage({
        type: WorkerMessageTypes.LOAD_DATA,
        data: tournaments,
      });
      setData(tournaments);
      onMessage({
        type: WorkerMessageTypes.LOAD_DATA,
        data: tournaments,
      });
    }
  }, [data]);

  const getData = useCallback(() => {
    return data;
  }, [data]);

  useEffect(() => {
    workerRef.current = new Worker(
      new URL('./worker-winamax.tsx', import.meta.url),
      {
        type: 'module',
      },
    );

    workerRef.current.onmessage = (event) => {
      onMessage({
        type: event.data.type,
        data: event.data,
      });
    };
  }, [runWorker]);

  return { runWorker, clearWorker, loadData, getData };
};
