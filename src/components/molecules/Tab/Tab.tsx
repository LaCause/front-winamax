import iconTick from '/assets/icons/tick.svg';
import React, { useEffect, useState } from 'react';
import iconToken from '/assets/icons/token.svg';
import { TabProps } from './Tab.model';
import { formatCurrency, formatDate } from '../../../utils';
import { useAnimations } from '../../../hook/useAnimations/useAnimations';

const addTick = (isActive: boolean) =>
  isActive ? (
    <>
      <span className="flex justify-evenly px-1 rounded-3xl bg-primary-green ml-auto">
        <img className="mr-1" src={iconTick} width={15} />
        <b className="mr-2 font-archivoNarrowBold text-xl">IN</b>
      </span>
    </>
  ) : null;

const addInfoBox = (hasInfoBox: TabProps['hasInfoBox']) =>
  hasInfoBox ? (
    <>
      <section className="relative font-bold bg-primary-yellow w-full rounded-t-3xl top-[20px] -z-10 h-[45px] text-black -mt-[20px]">
        <p className="px-4 font-archivoNarrowBold">TOP TOURNOI</p>
      </section>
    </>
  ) : null;

export const Tab: React.FC<TabProps> = ({
  hasInfoBox,
  tournament,
  addTournament,
  removeTournament,
}) => {
  const [active, setActive] = useState<boolean>();
  const { firstAnimation, secondAnimation, thirdAnimation } =
    useAnimations(active);

  const handleClick = (event: React.MouseEvent<HTMLLIElement>) =>
    setActive(!active);
  const border = active ? 'shadow-shadowTab' : null;

  useEffect(() => {
    if (active) {
      addTournament(tournament);
    } else {
      removeTournament(tournament);
    }
  }, [active]);

  return (
    <>
      <li
        key={tournament.tournamentId + 1}
        className="relative"
        onClick={(event) => handleClick(event)}
      >
        {addInfoBox(hasInfoBox)}
        <section
          className={`relative flex flex-col text-black rounded-3xl bg-white py-2 px-4 gap-y-2 ${border} cursor-pointer`}
        >
          <div className="flex items-center">
            <span className="flex py-2 px-3 rounded-3xl bg-primary-white relative -mr-[10px] right-[25px] shadow-md">
              <img
                className="object-contain"
                src={`/assets/flags/${tournament.flag}.png`}
                width={15}
              />
            </span>
            <b className="font-archivoNarrowBold text-xl">{tournament.name}</b>
            {active && addTick(active)}
          </div>
          <img
            src={iconToken}
            width={25}
            className={`animated-token opacity-0 ${firstAnimation}`}
          />
          <img
            src={iconToken}
            width={25}
            className={`animated-token opacity-0 ${secondAnimation}`}
          />
          <img
            src={iconToken}
            width={25}
            className={`animated-token opacity-0 ${thirdAnimation}`}
          />
          <div className="flex">
            <div className="w-1/2 flex">
              <span className="w-1/2">
                <time className="font-archivoNarrowSemiBold">
                  {formatDate(tournament.startDate)}
                </time>
              </span>
              <span className="flex w-1/2">
                {tournament?.icons.map((icon) => (
                  <img
                    className="object-contain rounded-lg"
                    src={`/assets/icons/${icon}.png`}
                    width={20}
                  />
                ))}
              </span>
            </div>
            <div className="w-1/2 flex justify-between front)">
              <p className="font-archivoNarrow">{tournament.limit}</p>
              <p className="font-archivoNarrow">{tournament.nbPlayers}</p>
              <p className="font-archivoNarrow">
                {formatCurrency(tournament.buyIn)}
              </p>
              <span className="font-archivoNarrowBold rounded-3xl bg-primary-grey px-2 text-primary-red">
                {formatCurrency(tournament.prizepool)}
              </span>
            </div>
          </div>
        </section>
      </li>
    </>
  );
};
