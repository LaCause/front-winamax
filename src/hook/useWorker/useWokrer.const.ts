export const WORKER_KEY = 'worker-winamax-sny';

export const WorkerMessageTypes = {
  LOAD_DATA: 'LOAD_DATA',
  FILTER_DATA: 'FILTER_DATA',
  CLEAR_DATA: 'CLEAR_DATA',
  REFRESH_DATA: 'REFRESH_DATA',
} as const;

export const WorkerMessageStates = {
  WORKER_INPUT: 'WORKER_INPUT',
  WORKER_OUTPUT: 'WORKER_OUTPUT',
} as const;
