import { Tournament } from '../useTournaments/useTournaments.model';

const ctx: Worker = self as any;

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

ctx.onmessage = async (event: MessageEvent<any>) => {
  const data = event.data;
  if (!data || !data.tournaments || !Array.isArray(data.tournaments)) {
    console.error(
      "Erreur : data.tournaments est mal défini ou n'est pas un tableau",
    );
    return; // Sortie anticipée pour éviter les erreurs
  }

  // Exemple de traitement : multiplie chaque élément par 2
  const processedData = findTriple(data.tournaments, data.min, data.max);
  // const processedData = data;

  // Envoie le résultat au thread principal
  ctx.postMessage(processedData);
};
