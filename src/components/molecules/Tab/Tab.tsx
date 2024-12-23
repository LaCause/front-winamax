import iconTick from '/assets/icons/tick.svg';
import React from 'react';
import { TabProps } from './Tab.model';
import { formatCurrency, formatDate, getBasenameUrl } from '../../../utils';
import PokerChips from '../../atoms/PokerChips/PokerChips';
import { ImageComponent } from '../../atoms/Image/Image';

export const Tab = React.memo(
  ({ tournament, isActive, hasInfoBox, onActiveTab }: TabProps) => {
    const handleClick = () => {
      onActiveTab?.(!isActive, tournament);
    };

    return (
      <li
        key={tournament.tournamentId}
        className="relative"
        onClick={handleClick}
      >
        {hasInfoBox && (
          <section className="relative font-bold bg-primary-yellow w-full rounded-t-3xl top-[20px] h-[45px] text-black -mt-[20px]">
            <p className="px-4 font-archivoNarrowBold">TOP TOURNOI</p>
          </section>
        )}
        <section
          className={`relative flex flex-col text-black rounded-3xl bg-white py-2 px-4 gap-y-2 cursor-pointer ${
            isActive ? 'shadow-shadowTab' : ''
          }`}
        >
          <div className="flex items-center">
            <span className="flex justify-center py-2 px-3 rounded-3xl bg-primary-white relative -mr-[10px] right-[25px] shadow-md">
              <ImageComponent
                width={15}
                height={15}
                src={`${getBasenameUrl()}/assets/flags/${tournament.flag}.png`}
              />
            </span>
            <b className="font-archivoNarrowBold text-xl">{tournament.name}</b>
            <PokerChips
              className="ml-2 overflow-visible"
              isAnimating={isActive}
            />
            {isActive && (
              <span className="flex justify-evenly px-1 rounded-3xl bg-primary-green ml-auto">
                <img className="mr-1" src={iconTick} width={15} alt="tick" />
                <b className="mr-2 font-archivoNarrowBold text-xl">IN</b>
              </span>
            )}
          </div>
          <div className="flex">
            <div className="w-1/2 flex">
              <span className="w-1/2">
                <time className="font-archivoNarrowSemiBold">
                  {formatDate(tournament.startDate)}
                </time>
              </span>
              <span className="flex w-1/2">
                {tournament.icons?.map((icon, index) => (
                  <ImageComponent
                    key={index}
                    className="object-contain rounded-lg"
                    width={20}
                    height={20}
                    src={`${getBasenameUrl()}/assets/icons/${icon}.png`}
                  />
                ))}
              </span>
            </div>
            <div className="w-1/2 flex justify-between">
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
    );
  },
);
