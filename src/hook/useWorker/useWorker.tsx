// useWorker.js
import { useRef, useEffect, useState, useCallback } from 'react';
import { Tournament } from '../useTournaments/useTournaments.model';

export const useWorker = (onMessage: any) => {
  const [data, setData] = useState<Tournament[]>();
  const [isProcessing, setIsProcessing] = useState(true);
  const workerRef = useRef<Worker>();

  useEffect(() => {
    workerRef.current = new Worker(
      new URL('./worker-winamax.ts', import.meta.url),
      {
        type: 'module',
      },
    );

    workerRef.current.onmessage = (e) => onMessage(e.data);
  }, []);

  const runWorker = (data: Tournament[]) => {
    if (workerRef.current) {
      workerRef.current.postMessage(data);
    }
  };

  const stopWorker = () => {
    workerRef.current?.terminate();
  };

  const loadData = useCallback(async () => {
    const response = await fetch('./sample-poker.json');
    const tournaments = await response.json();
    if (tournaments) {
      setData(tournaments);
      onMessage(tournaments);
    }
  }, [data]);

  const getData = useCallback(() => {
    return data;
  }, [data]);

  return { runWorker, stopWorker, loadData, getData };
};
