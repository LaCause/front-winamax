import pokerBanner from '/images/tournois.jpg';
import { HeaderTab } from '../../components/molecules/HeaderTab/HeaderTab';
import { useTournaments } from '../../hook/useTournaments/useTournaments';
import { Modal } from '../../components/molecules/Modal/Modal';
import { useRef, useState } from 'react';
import { TabList } from '../../components/organisms/TabList/TabList';
import { ModalHandle } from '../../components/molecules/Modal/Modal.model';
import { formatCurrency } from '../../utils';
import { DoubleRange } from '../../components/molecules/DoubleRange/DoubleRange';
import { DoubleRangeHandle } from '../../components/molecules/DoubleRange/DoubleRange.model';

export const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [rangeValues, setRangeValues] = useState({ min: 0, max: 10000 });

  const {
    tournamentList,
    selectedTournaments,
    addTournament,
    removeTournament,
    isProcessing,
  } = useTournaments();

  const modalFilterRef = useRef<ModalHandle>(null);
  const doubleRangeRef = useRef<DoubleRangeHandle>(null);

  const toggleModal = () => setIsModalOpen((prev) => !prev);

  const handleClick = () => {
    setIsModalOpen(false);
  };
  const handleRangeChange = (values: { min: number; max: number }) => {
    setRangeValues(values);
  };

  return (
    <>
      <section className="flex flex-col px-3">
        <div className="flex justify-center">
          <img src={pokerBanner} className="rounded-3xl" />
        </div>
        <>
          <button className="btn btn-active mt-2" onClick={toggleModal}>
            Ouvrir les filtres
          </button>
          <Modal
            ref={modalFilterRef}
            isOpen={isModalOpen}
            header={<h2 className="tracking-wider capitalize">Filtres</h2>}
            content={
              <>
                <div className="flex justify-center gap-x-3">
                  <div className="badge badge-outline px-3 py-4 border-primary-red text-primary-grey">
                    BuyIn min. :
                    <b className="text-white ml-1">
                      {formatCurrency(rangeValues.min)}
                    </b>
                  </div>
                  <div className="badge badge-outline px-3 py-4 border-primary-red text-primary-grey">
                    BuyIn max. :
                    <b className="text-white ml-1">
                      {formatCurrency(rangeValues.max)}
                    </b>
                  </div>
                </div>
                <form method="dialog" className="flex flex-col text-center">
                  <DoubleRange
                    ref={doubleRangeRef}
                    min={0}
                    max={10000}
                    onChange={handleRangeChange}
                  />
                  <div className="mt-7">
                    <button
                      className="btn border-1 border-primary-red bg-slate-950 my-3 text-white"
                      onClick={handleClick}
                    >
                      Valider
                    </button>
                  </div>
                </form>
              </>
            }
          />
        </>
        <div>
          <ul className="flex flex-col gap-3">
            <HeaderTab className="mt-3" />
            <TabList
              loading={isProcessing}
              addTournament={addTournament}
              removeTournament={removeTournament}
              selectedTournaments={selectedTournaments}
              tournamentList={tournamentList}
            />
          </ul>
        </div>
      </section>
    </>
  );
};
