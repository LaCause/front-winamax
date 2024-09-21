import { Tournament } from '../useTournaments.model';

const hasOneHourInterval = (target: Date) => {
  const currentDate = new Date();
  const differenceInMilliseconds = Math.abs(
    currentDate.getTime() - target.getTime(),
  );
  const differenceInHours = differenceInMilliseconds / (1000 * 60 * 60);

  return differenceInHours >= 1;
};

export const filterRules = (tournament: Tournament, min: number, max: number) =>
  tournament.buyIn >= min &&
  tournament.buyIn <= max &&
  hasOneHourInterval(new Date(tournament.startDate));
