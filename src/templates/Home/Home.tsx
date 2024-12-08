import pokerBanner from '/images/tournois.jpg';
import { HeaderTab } from '../../components/molecules/HeaderTab/HeaderTab';
import { useTournaments } from '../../hook/useTournaments/useTournaments';
import { Modal } from '../../components/molecules/Modal/Modal';
import { useRef, useState } from 'react';
import { ModalHandle } from '../../components/molecules/Modal/Modal.model';
import { formatCurrency } from '../../utils';
import { DoubleRange } from '../../components/molecules/DoubleRange/DoubleRange';
import { DoubleRangeHandle } from '../../components/molecules/DoubleRange/DoubleRange.model';
import { WithListStructure } from '../../hocs/withListStructure/withListStructure';
import { ListStructure } from '../../components/molecules/ListStructure/ListStructure';
import { StructureTypes } from '../../components/molecules/ListStructure/ListStructure.model';

export const Home = () => {
  const { processing, tournaments, filterData, error } = useTournaments();
  const [isOpen, setIsOpen] = useState(false);
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(10000);
  const modalRef = useRef<ModalHandle>(null);
  const doubleRangeRef = useRef<DoubleRangeHandle>(null);

  // @TODO: Add tinder with bet logic :
  // -> Swipe left / right : Team 1 vs Team 2
  // -> Swipe up / down : Team 1 vs Team 3
  // -> Swipe down / up : Team 2 vs Team 3

  const DynamicListComponent = WithListStructure(ListStructure, processing);

  const applyFilter = async () => {
    const test = await filterData([{ code: 'price', value: 'test' }]);
    if (!error) {
      modalRef.current?.closeModal();
    }
  };

  const handlePriceChange = (values: { min: number; max: number }) => {
    setMinPrice(values.min);
    setMaxPrice(values.max);
  };

  return (
    <>
      <section className="flex flex-col gap-3 px-3">
        <img src={pokerBanner} className="rounded-3xl" />
        <button className="btn" onClick={modalRef.current?.openModal}>
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
              <form
                method="dialog"
                className="flex flex-col text-center"
                onSubmit={(e) => e.preventDefault()}
              >
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
                  <p className="text-primary-red">{error}</p>
                </div>
              </form>
            </>
          }
        />
        <div>
          <ul className="flex flex-col gap-3">
            <HeaderTab className="mt-3" />
            {tournaments && (
              <DynamicListComponent
                props={{
                  items: tournaments,
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
