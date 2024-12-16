import { formatQueryFilters, processChunk } from '../../utils';
import {
  MAX_TOURNAMENT_LIST,
  Tournament,
  WorkerMessageInput,
  WorkerMessageOutput,
  WorkerMessageTypes,
} from './useWorker.model';
import { StructureTypes } from '../../components/molecules/ListStructure/ListStructure.model';
import { FiltersCode } from '../useFilters/useFilters.model';

const ctx: Worker = self as any;

const findTriple = async (
  tournaments: Tournament[],
  min: number,
  max: number,
) => {
  if (!tournaments) return [];

  const filteredTournaments = tournaments.filter(
    (tournament) => tournament.buyIn > min && tournament.buyIn < max,
  );

  let triples: Tournament[][] = [];
  processChunk(filteredTournaments, 350, (chunk) => {
    for (let i = 0; i < chunk.length; i++) {
      for (let j = i + 1; j < chunk.length; j++) {
        for (let k = j + 1; k < chunk.length; k++) {
          const t1 = chunk[i],
            t2 = chunk[j],
            t3 = chunk[k];
          if (
            Math.abs(t1.startDate - t2.startDate) >= 3600000 &&
            Math.abs(t2.startDate - t3.startDate) >= 3600000
          ) {
            const totalBuyIn = t1.buyIn + t2.buyIn + t3.buyIn;
            if (totalBuyIn >= min && totalBuyIn <= max) {
              triples.push([t1, t2, t3]);
            }
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
}) => {
  const query = formatQueryFilters(queryFilter);
  const tripleFilter = query.find(
    (filter) => filter.code === FiltersCode.triple,
  );
  const buyInFilter = query.find((filter) => filter.code === FiltersCode.buyIn);
  if (tripleFilter && buyInFilter) {
    return await findTriple(data, buyInFilter.value.min, buyInFilter.value.max);
  }
};

const initialData = [] as Tournament[];

ctx.onmessage = async (event: MessageEvent<WorkerMessageInput>) => {
  if (typeof window !== undefined && event.data.key !== 'worker-winamax-sny') {
    self.close();
    return;
  }

  switch (event.data.type) {
    case WorkerMessageTypes.LOAD_DATA:
      initialData.push(...event.data.data);
      ctx.postMessage({
        listStructure: StructureTypes.GRID,
        type: WorkerMessageTypes.LOAD_DATA,
        data: initialData,
      });
      break;

    case WorkerMessageTypes.FILTER_DATA:
      const copyData = initialData;
      const query = event.data.query;

      const filteredTournaments = await applyFilterRules({
        data: copyData,
        queryFilter: query,
      });

      ctx.postMessage({
        listStructure:
          filteredTournaments && filteredTournaments.length > 0
            ? StructureTypes.TRIPLE
            : StructureTypes.LIST,
        type: WorkerMessageTypes.FILTER_DATA,
        data: filteredTournaments,
        query: query,
      } as WorkerMessageOutput);
      break;
  }
};
