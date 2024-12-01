import { W } from 'vitest/dist/chunks/reporters.C_zwCd4j.js';
import { Tournament } from '../useTournaments/useTournaments.model';
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

const findTriple = (
  allTournamentList: Tournament[],
  min: number,
  max: number,
) => {
  if (!allTournamentList) return;
  const result = [];
  const filtered = allTournamentList.filter(
    (tournament) => tournament.buyIn >= min && tournament.buyIn <= max,
  );

  if (!filtered) return;

  for (let i = 0; i < filtered.length; i++) {
    for (let j = i + 1; j < filtered.length; j++) {
      for (let x = j + 1; x < filtered.length; x++) {
        const firstTournament = allTournamentList[i];
        const secondTournament = allTournamentList[j];
        const thirdTournament = allTournamentList[x];

        const totalBuyIn =
          firstTournament.buyIn +
          secondTournament.buyIn +
          thirdTournament.buyIn;

        if (
          totalBuyIn >= min &&
          totalBuyIn <= max &&
          isValidTriple(firstTournament, secondTournament, thirdTournament)
        ) {
          result.push([firstTournament, secondTournament, thirdTournament]);
        }
      }
    }
  }

  return result.sort((a, b) => {
    const totalA = a.reduce((sum, t) => sum + t.buyIn, 0);
    const totalB = b.reduce((sum, t) => sum + t.buyIn, 0);
    return totalA - totalB;
  });
};

const dataLoaded = [] as Tournament[];

ctx.onmessage = async (event: MessageEvent<WorkerMessage>) => {
  const data = event.data;
  if (!data) throw new Error('No data');

  const isRefresh = event.data.type === WorkerMessageTypes.REFRESH_DATA;
  const isLoaded = event.data.type === WorkerMessageTypes.LOAD_DATA;

  if (isRefresh || isLoaded) {
    dataLoaded.push(...event.data.data);
    ctx.postMessage({
      type: event.data.type,
      data: dataLoaded,
    });
  }
};
