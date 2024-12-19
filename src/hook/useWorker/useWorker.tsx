import { useRef, useEffect, useState, useCallback } from 'react';
import { Tournament, WorkerMessage } from './useWorker.model';
import {
  WORKER_KEY,
  WorkerMessageStates,
  WorkerMessageTypes,
} from './useWokrer.const';
import { ContextRPC } from './worker-winamax';
import { StructureTypes } from '../../components/molecules/ListStructure/ListStructure.model';
import { loadJsonDataTournaments } from '../../utils';
import { useLocation } from 'react-router-dom';

export const useWorker = () => {
  const location = useLocation();
  const [data, setData] = useState<WorkerMessage>();
  const [processing, setProcessing] = useState(true);
  const workerRef = useRef<ContextRPC>();

  const runWorkerMessage = useCallback(
    (message: WorkerMessage) => {
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
        };
        setData((prevData: any) => {
          if (JSON.stringify(prevData) === JSON.stringify(formated)) {
            return prevData;
          }
          return formated;
        });
        setProcessing(false);
      };
    }
  }, [workerRef]);

  useEffect(() => {
    const initializeWorker = async () => {
      if (!data) {
        try {
          const response =
            (await loadJsonDataTournaments()) as unknown as Tournament[];

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
            query: location.search,
            type: WorkerMessageTypes.LOAD_DATA,
            state: WorkerMessageStates.WORKER_INPUT,
            data: formattedResponse,
            listStructure: StructureTypes.GRID,
          });
        } catch (error) {
          throw new Error(error as string);
        }
      }
    };
    initializeWorker();
  }, [data, listenWorkerMessage, location.search, runWorkerMessage]);

  return { data, runWorkerMessage, processing };
};
