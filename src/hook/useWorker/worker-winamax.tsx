import { W } from 'vitest/dist/chunks/reporters.C_zwCd4j.js';
import {
  MAX_TOURNAMENT_LIST,
  Tournament,
} from '../useTournaments/useTournaments.model';
import { WorkerMessage } from './useWorker';

const ctx: Worker = self as any;

export enum WorkerMessageTypes {
  LOAD_DATA = 'LOAD_DATA',
  FILTER_DATA = 'FILTER_DATA',
  CLEAR_DATA = 'CLEAR_DATA',
  REFRESH_DATA = 'REFRESH_DATA',
}

const isValidTriple = (
  firstTournament: Tournament,
  secondTournament: Tournament,
  thirdTournament: Tournament,
) => {
  const times = [
    new Date(firstTournament.startDate),
    new Date(secondTournament.startDate),
    new Date(thirdTournament.startDate),
  ];

  return (
    Math.abs(times[0].getTime() - times[1].getTime()) >= 3600000 &&
    Math.abs(times[0].getTime() - times[2].getTime()) >= 3600000 &&
    Math.abs(times[1].getTime() - times[2].getTime()) >= 3600000
  );
};

const processChunk = async (
  tournaments: Tournament[],
  chunkSize: number,
  callback: (tournaments: Tournament[]) => void,
) => {
  let index = 0;
  const processNextChunk = () => {
    const chunk = tournaments.slice(index, index + chunkSize);
    callback(chunk);
    index += chunkSize;
    if (index < tournaments.length) {
      console.log(index < tournaments.length);
      setTimeout(processNextChunk, 0);
    }
  };

  processNextChunk();
};

const findTriple = async (
  tournaments: Tournament[],
  min: number,
  max: number,
) => {
  if (!tournaments) return [];

  const filteredTournaments = tournaments
    .filter((tournament) => tournament.buyIn > min && tournament.buyIn < max)
    .map((tournament) => ({
      ...tournament,
      startDate: new Date(tournament.startDate).getTime(),
    }));

  console.log('filteredTournaments', filteredTournaments);

  let triples = [];

  console.log('filteredTournaments.length', filteredTournaments.length);
  processChunk(filteredTournaments, 100, (chunk) => {
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

  //   for (let j = i + 1; j < tournaments.length; j++) {
  //     for (let k = j + 1; k < tournaments.length; k++) {
  //       const t1 = tournaments[i],
  //         t2 = tournaments[j],
  //         t3 = tournaments[k];
  //       if (
  //         Math.abs(t1.startDate - t2.startDate) >= 3600000 &&
  //         Math.abs(t2.startDate - t3.startDate) >= 3600000
  //       ) {
  //         const totalBuyIn = t1.buyIn + t2.buyIn + t3.buyIn;
  //         if (totalBuyIn >= minBuyIn && totalBuyIn <= maxBuyIn) {
  //           triplets.push([t1, t2, t3]);
  //         }
  //       }
  //     }
  //   }
  // }
  // console.log('triplets', triplets);

  // const filteredTournaments = allTournamentList
  //   .filter((tournament) => tournament.buyIn > min && tournament.buyIn < max)
  //   .map((tournament) => ({
  //     ...tournament,
  //     startDate: new Date(tournament.startDate).getTime(),
  //   }))
  //   .sort((a, b) => a.startDate - b.startDate);
  // .slice(0, MAX_TOURNAMENT_LIST);

  //   for (let j = i + 1; j < filteredTournaments.length - 1; j++) {
  //     // Vérifier la contrainte de 1h entre i et j
  //     if (
  //       Math.abs(
  //         filteredTournaments[i].startDate - filteredTournaments[j].startDate,
  //       ) < 3600000
  //     ) {
  //       continue;
  //     }

  //     for (let k = j + 1; k < filteredTournaments.length; k++) {
  //       // Vérifier la contrainte de 1h entre j et k
  //       if (
  //         Math.abs(
  //           filteredTournaments[j].startDate - filteredTournaments[k].startDate,
  //         ) < 3600000
  //       ) {
  //         continue;
  //       }

  //       // Vérifier la contrainte de 1h entre i et k
  //       if (
  //         Math.abs(
  //           filteredTournaments[i].startDate - filteredTournaments[k].startDate,
  //         ) < 3600000
  //       ) {
  //         continue;
  //       }

  //       // Calculer le buy-in total
  //       const totalBuyIn =
  //         filteredTournaments[i].buyIn +
  //         filteredTournaments[j].buyIn +
  //         filteredTournaments[k].buyIn;

  //       // Vérifier les contraintes de buy-in
  //       if (totalBuyIn >= min && totalBuyIn <= max) {
  //         triplets.push([
  //           filteredTournaments[i],
  //           filteredTournaments[j],
  //           filteredTournaments[k],
  //         ]);
  //       }
  //     }
  //   }
  // }

  // console.time('test');
  // let sum = 0;
  // for (let i = 0; i < 4000000; i++) {
  //   sum += i;
  // }
  // console.timeEnd('test');

  // .map((tournament) => ({
  //   ...tournament,
  //   startDate: new Date(tournament.startDate).getTime(),
  // }))
  // .sort((a, b) => a.startDate - b.startDate);

  // return validTournaments.reduce<Tournament[][]>((acc, tournament, index) => {
  //   const nextTournament = validTournaments[index + 1];
  //   const nextNextTournament = validTournaments[index + 2];

  //   console.log(
  //     'isValid',
  //     isValidTriple(tournament, nextTournament, nextNextTournament),
  //   );

  //   const triplet = validTournaments.map((tournamentCheck) => {
  //     return [tournamentCheck, nextTournament, nextNextTournament];
  //   });

  //   acc.push(triplet);

  //   return acc;
  // }, []);
};

const dataLoaded = [] as Tournament[];

ctx.onmessage = async (event: MessageEvent<WorkerMessage>) => {
  const data = event.data;
  if (!data.data) throw new Error('No data');

  const isRefresh = event.data.type === WorkerMessageTypes.REFRESH_DATA;
  const isLoaded = event.data.type === WorkerMessageTypes.LOAD_DATA;
  const isFilter = event.data.type === WorkerMessageTypes.FILTER_DATA;

  if (isFilter) {
    try {
      const triples = await findTriple(data.data, 10, 1000);

      console.log('findTriple : ', triples);
      console.log('findTriple : ', new Date(triples[0][0].startDate));
      console.log('findTriple : ', new Date(triples[0][1].startDate));
      console.log('findTriple : ', new Date(triples[0][2].startDate));

      ctx.postMessage({
        type: event.data.type,
        data: triples,
      });
    } catch (error) {
      console.log('find triple error : ', error);
    }
  }

  if (isRefresh || isLoaded) {
    dataLoaded.push(...event.data.data);
    ctx.postMessage({
      type: event.data.type,
      data: dataLoaded,
    });
  }
};
