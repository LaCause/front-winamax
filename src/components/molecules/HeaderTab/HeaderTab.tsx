import React from 'react';
import { HeaderTabProps } from './HeaderTab.model';

export const HeaderTab: React.FC<HeaderTabProps> = ({ className }) => {
  return (
    <>
      <section
        className={`flex px-4 py-2 rounded-xl shadow-sm bg-white text-black font-archivoNarrowBold ${className}`}
      >
        <div className="flex w-1/2">
          <p className="w-1/2">Début</p>
          <p className="w-1/2">Nom</p>
        </div>
        <div className="flex w-1/2 justify-between">
          <p>Jeu</p>
          <p>Jrs.</p>
          <p>BuyIn.</p>
          <p>Dotation</p>
        </div>
      </section>
    </>
  );
};
