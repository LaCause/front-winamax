import { useRef, useEffect, useState, useCallback } from 'react';
import { Tournament, WorkerMessageInput } from './useWorker.model';
import { WORKER_KEY, WorkerMessageTypes } from './useWokrer.const';
import { ContextRPC } from './worker-winamax';
import { StructureTypes } from '../../components/molecules/ListStructure/ListStructure.model';

export const useWorker = () => {
  const [data, setData] = useState<WorkerMessageInput>();
  const [processing, setProcessing] = useState(true);
  const workerRef = useRef<ContextRPC>();

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
      workerRef.current.onmessage = async (event) => {
        const formated = {
          ...event.data,
          data: event.data.data?.slice(0, 10),
        } as WorkerMessageInput;

        setData(formated);
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
          ) as unknown as ContextRPC;

          listenWorkerMessage();
        }

        runWorkerMessage({
          key: WORKER_KEY,
          query: [],
          type: WorkerMessageTypes.LOAD_DATA,
          data: formattedResponse,
          listStructure: StructureTypes.GRID,
        });
      }
    };
    initializeWorker();
  });

  return { data, runWorkerMessage, processing };
};
