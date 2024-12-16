import { useRef, useEffect, useState, useCallback } from 'react';
import {
  Tournament,
  WORKER_KEY,
  WorkerMessageInput,
  WorkerMessageOutput,
  WorkerMessageTypes,
} from './useWorker.model';
import { useLocation } from 'react-router-dom';

export const useWorker = () => {
  const [data, setData] = useState<WorkerMessageOutput>();
  const [processing, setProcessing] = useState(true);
  const workerRef = useRef<Worker>();

  const runWorkerMessage = useCallback(
    (message: WorkerMessageInput) => {
      setProcessing(true);
      if (workerRef.current) {
        workerRef.current.postMessage(message);
      }
    },
    [workerRef],
  );

  const listenWorkerMessage = useCallback(() => {
    if (workerRef.current) {
      workerRef.current.onmessage = async (
        event: MessageEvent<WorkerMessageOutput>,
      ) => {
        setData(event.data);
        setProcessing(false);
      };
    }
  }, [workerRef]);

  useEffect(() => {
    const initializeWorker = async () => {
      if (!data) {
        const response: Tournament[] = await fetch('./sample-poker.json').then(
          (res) => res.json(),
        );

        const formattedResponse = response.map((tournament: Tournament) => ({
          ...tournament,
          startDate: new Date(tournament.startDate).getTime(),
        }));

        if (!workerRef.current) {
          workerRef.current = new Worker(
            new URL('./worker-winamax.tsx', import.meta.url),
            {
              type: 'module',
            },
          );

          listenWorkerMessage();
        }

        runWorkerMessage({
          key: WORKER_KEY,
          query: [],
          type: WorkerMessageTypes.LOAD_DATA,
          data: formattedResponse,
        });
      }
    };
    initializeWorker();
  }, []);

  return { data, runWorkerMessage, processing };
};
