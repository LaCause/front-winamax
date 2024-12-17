import { formatQueryFilters, processChunk } from '../../utils';
import {
  MAX_TOURNAMENT_LIST,
  Tournament,
  Triple,
  WorkerMessageInput,
  WorkerMessageOutput,
} from './useWorker.model';
import { StructureTypes } from '../../components/molecules/ListStructure/ListStructure.model';
import { FiltersCode, FilterTypes } from '../useFilters/useFilters.model';
import { WORKER_KEY, WorkerMessageTypes } from './useWokrer.const';

export interface ContextRPC {
  onmessage: (event: MessageEvent<WorkerMessageInput>) => void;
  postMessage: (message: WorkerMessageInput | WorkerMessageOutput) => void;
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
    (event.data as WorkerMessageInput).key !== 'worker-winamax-sny'
  ) {
    self.close();
    return;
  }

  switch (event.data.type) {
    case WorkerMessageTypes.LOAD_DATA: {
      initialData.push(...event.data.data);
      console.log('POST MESSAGE');
      ctx.postMessage({
        key: WORKER_KEY,
        listStructure: StructureTypes.GRID,
        type: WorkerMessageTypes.LOAD_DATA,
        data: initialData,
      });
      break;
    }

    case WorkerMessageTypes.FILTER_DATA: {
      const copyData = initialData;
      const query = event.data.query;

      const filteredTournaments = await applyFilterRules({
        data: copyData,
        queryFilter: query,
      });

      if (filteredTournaments) {
        ctx.postMessage({
          listStructure:
            filteredTournaments && filteredTournaments.length > 0
              ? StructureTypes.TRIPLE
              : StructureTypes.LIST,
          type: WorkerMessageTypes.FILTER_DATA,
          data: filteredTournaments,
          query: query,
        });
      }
      break;
    }
    default:
      console.log('END SWICH');
      break;
  }
};
