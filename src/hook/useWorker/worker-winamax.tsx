import { formatQueryFilters, processChunk } from '../../utils';
import {
  MAX_TOURNAMENT_LIST,
  Tournament,
  Triple,
  WorkerMessage,
} from './useWorker.model';
import { StructureTypes } from '../../components/molecules/ListStructure/ListStructure.model';
import { FiltersCode, FilterTypes } from '../useFilters/useFilters.model';
import {
  WORKER_KEY,
  WorkerMessageStates,
  WorkerMessageTypes,
} from './useWokrer.const';

export interface ContextRPC {
  onmessage: (event: MessageEvent<WorkerMessage>) => void;
  postMessage: (message: WorkerMessage) => void;
}

const ctx: ContextRPC = self as unknown as ContextRPC;

const findTriple = async (
  tournaments: Tournament[],
  minBuyIn: number,
  maxBuyIn: number,
): Promise<Tournament[][]> => {
  if (!tournaments) return [];

  const filteredTournaments = tournaments.filter(
    ({ buyIn }) => buyIn > minBuyIn && buyIn < maxBuyIn,
  );

  const triples: Tournament[][] = [];

  processChunk(filteredTournaments, 350, (chunk) => {
    for (let i = 0; i < chunk.length; i++) {
      for (let j = i + 1; j < chunk.length; j++) {
        for (let k = j + 1; k < chunk.length; k++) {
          const [t1, t2, t3] = [chunk[i], chunk[j], chunk[k]];
          const isTimeGapValid =
            Math.abs(t1.startDate - t2.startDate) >= 3600000 &&
            Math.abs(t2.startDate - t3.startDate) >= 3600000;

          const totalBuyIn = t1.buyIn + t2.buyIn + t3.buyIn;

          if (
            isTimeGapValid &&
            totalBuyIn >= minBuyIn &&
            totalBuyIn <= maxBuyIn
          ) {
            triples.push([t1, t2, t3]);
          }
        }
      }
    }
  });

  return triples.slice(0, MAX_TOURNAMENT_LIST);
};

const applyFilterRules = async ({
  data,
  queryFilter,
}: {
  data: Tournament[];
  queryFilter: string;
}): Promise<Tournament[] | Triple> => {
  const filters = formatQueryFilters(queryFilter);
  const tripleFilter = filters.find((f) => f.code === FiltersCode.triple);
  const buyInFilter = filters.find((f) => f.code === FiltersCode.buyIn);

  if (tripleFilter && buyInFilter) {
    if (buyInFilter.type === FilterTypes.RANGE) {
      return await findTriple(
        data,
        buyInFilter.value.min,
        buyInFilter.value.max,
      );
    }
  }

  return [];
};

const initialData = [] as Tournament[];

ctx.onmessage = async (event) => {
  if (
    typeof window !== 'undefined' &&
    event.data.key !== 'worker-winamax-sny'
  ) {
    self.close();
    return;
  }

  if (
    event.data.state === WorkerMessageStates.WORKER_INPUT &&
    event.data.type === WorkerMessageTypes.LOAD_DATA
  ) {
    initialData.push(...event.data.data);
  }

  switch (event.data.state) {
    case WorkerMessageStates.WORKER_INPUT: {
      let result: Tournament[] | Tournament[][] = initialData;
      let listStructure: StructureTypes = StructureTypes.GRID;

      if (event.data.query) {
        result = await applyFilterRules({
          data: result,
          queryFilter: event.data.query,
        });
        listStructure = StructureTypes.TRIPLE;
      }

      ctx.postMessage({
        key: WORKER_KEY,
        type: WorkerMessageTypes.LOAD_DATA,
        state: WorkerMessageStates.WORKER_OUTPUT,
        listStructure,
        data: result,
        query: event.data.query,
      });
      break;
    }

    case WorkerMessageStates.WORKER_OUTPUT: {
      ctx.postMessage({
        key: WORKER_KEY,
        listStructure: StructureTypes.GRID,
        data: initialData,
        type: WorkerMessageTypes.LOAD_DATA,
        state: WorkerMessageStates.WORKER_OUTPUT,
        query: event.data.query,
      });
      break;
    }
  }
};
