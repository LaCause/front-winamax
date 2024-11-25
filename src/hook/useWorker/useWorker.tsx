// useWorker.js
import { useRef, useEffect, useState, useCallback } from 'react';
import { Tournament } from '../useTournaments/useTournaments.model';

/**
 * A hook that runs a worker and sends data to it.
 * @param {Function} onMessage - a callback function that will be called with the data from the worker
 * @returns {{ runWorker: Function, stopWorker: Function, loadData: Function, getData: Function }}
 */
export const useWorker = (
  onMessage: (data: Tournament[]) => void,
): {
  runWorker: (data: Tournament[]) => void;
  stopWorker: () => void;
  loadData: () => Promise<void>;
  getData: () => Tournament[] | undefined;
} => {
  const [data, setData] = useState<Tournament[]>();
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
