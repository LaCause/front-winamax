import pokerBanner from '/images/tournois.jpg';
import { HeaderTab } from '../../components/molecules/HeaderTab/HeaderTab';
import { useTournaments } from '../../hook/useTournaments/useTournaments';
import { Modal } from '../../components/molecules/Modal/Modal';
import { useEffect, useRef, useState } from 'react';
import { ModalHandle } from '../../components/molecules/Modal/Modal.model';
import { formatCurrency } from '../../utils';
import { DoubleRange } from '../../components/molecules/DoubleRange/DoubleRange';
import { DoubleRangeHandle } from '../../components/molecules/DoubleRange/DoubleRange.model';
import { WithListStructure } from '../../hocs/withListStructure/withListStructure';
import { ListStructure } from '../../components/molecules/ListStructure/ListStructure';
import { StructureTypes } from '../../components/molecules/ListStructure/ListStructure.model';

export const Home = () => {
  const { isProcessing, tournamentList, runWorkerWithFilter } =
    useTournaments();
  const [isOpen, setIsOpen] = useState(false);
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(10000);
  const modalRef = useRef<ModalHandle>(null);
  const doubleRangeRef = useRef<DoubleRangeHandle>(null);

  const DynamicListComponent = WithListStructure(ListStructure, isProcessing);

  const toggleModal = () => setIsOpen((prev) => !prev);

  const applyFilter = () => {
    runWorkerWithFilter();
    setIsOpen(false);
  };
  const handlePriceChange = (values: { min: number; max: number }) => {
    setMinPrice(values.min);
    setMaxPrice(values.max);
  };

  return (
    <>
      <section className="flex flex-col gap-3 px-3">
        <img src={pokerBanner} className="rounded-3xl" />
        <button className="btn" onClick={toggleModal}>
          Ouvrir les filtres
        </button>
        <Modal
          ref={modalRef}
          isOpen={isOpen}
          header={<h2 className="tracking-wider capitalize">Filtres</h2>}
          content={
            <>
              <div className="flex justify-center gap-x-3">
                <div className="badge badge-outline px-3 py-4 border-primary-red text-primary-grey">
                  Prix min. :
                  <b className="text-white ml-1">{formatCurrency(minPrice)}</b>
                </div>
                <div className="badge badge-outline px-3 py-4 border-primary-red text-primary-grey">
                  Prix max. :
                  <b className="text-white ml-1">{formatCurrency(maxPrice)}</b>
                </div>
              </div>
              <form method="dialog" className="flex flex-col text-center">
                <DoubleRange
                  ref={doubleRangeRef}
                  min={0}
                  max={10000}
                  onChange={handlePriceChange}
                />
                <div className="mt-7">
                  <button
                    className="btn border-1 border-primary-red bg-slate-950 my-3 text-white"
                    onClick={applyFilter}
                  >
                    Valider
                  </button>
                </div>
              </form>
            </>
          }
        />
        <div>
          <ul className="flex flex-col gap-3">
            <HeaderTab className="mt-3" />
            {tournamentList && (
              <DynamicListComponent
                props={{
                  items: tournamentList,
                  type: StructureTypes.GRID,
                }}
              />
            )}
          </ul>
        </div>
      </section>
    </>
  );
};
