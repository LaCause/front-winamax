// useWorker.js
import { useRef, useEffect } from 'react';
import { Tournament } from '../useTournaments/useTournaments.model';

export const useWorker = (onMessage: any) => {
  const workerRef = useRef<Worker>();

  useEffect(() => {
    workerRef.current = new Worker(
      new URL('./worker-winamax.ts', import.meta.url),
      {
        type: 'module',
      },
    );
    workerRef.current.onmessage = (e) => onMessage(e.data);

    return () => {
      workerRef?.current?.terminate();
    };
  }, [onMessage]);

  const runWorker = (data: Tournament[]) => {
    if (workerRef.current) {
      workerRef.current.postMessage(data);
    }
  };

  return { runWorker };
};
