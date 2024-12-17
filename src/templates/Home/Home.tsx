import pokerBanner from '/images/tournois.jpg';
import { Modal } from '../../components/molecules/Modal/Modal';
import { useMemo, useRef, useState } from 'react';
import { ModalHandle } from '../../components/molecules/Modal/Modal.model';
import { formatCurrency, formatFiltersToQuery } from '../../utils';
import { DoubleRange } from '../../components/molecules/DoubleRange/DoubleRange';
import { WithListStructure } from '../../hocs/withListStructure/withListStructure';
import { ListStructure } from '../../components/molecules/ListStructure/ListStructure';
import { useWorker } from '../../hook/useWorker/useWorker';
import { useFilters } from '../../hook/useFilters/useFilters';
import { Controller, useForm } from 'react-hook-form';
import { FilterInput } from '../../hook/useFilters/useFilters.model';
import { HeaderTab } from '../../components/molecules/HeaderTab/HeaderTab';
import { debounce } from 'lodash';
import {
  WORKER_KEY,
  WorkerMessageTypes,
} from '../../hook/useWorker/useWokrer.const';
import { StructureTypes } from '../../components/molecules/ListStructure/ListStructure.model';

//@TODO : add @typescript-eslint/parser @typescript-eslint/eslint-plugin
// add to linter form typescript coverage

// @TODO: Add tinder with bet logic :
// -> Swipe left / right : Team 1 vs Team 2
// -> Swipe up / down : Team 1 vs Team 3
// -> Swipe down / up : Team 2 vs Team 3

export const Home = () => {
  const { data, processing, runWorkerMessage } = useWorker();
  const { updateFilters, resetFilters, hasQueryFilters } = useFilters();
  const { control, handleSubmit, setValue, getValues, register } =
    useForm<FilterInput>();

  const [rangeValues, setRangeValues] = useState({ min: 0, max: 10000 });
  const min = useMemo(() => formatCurrency(rangeValues.min), [rangeValues.min]);
  const max = useMemo(() => formatCurrency(rangeValues.max), [rangeValues.max]);

  const modalRef = useRef<ModalHandle>(null);

  const applyFilter = async () => {
    const formValues = getValues();
    const query = formatFiltersToQuery(formValues);
    updateFilters(query);
    runWorkerMessage({
      key: WORKER_KEY,
      type: WorkerMessageTypes.FILTER_DATA,
      query,
      listStructure: StructureTypes.LIST,
    });
    modalRef.current?.closeModal();
  };

  const handleRangeChange = debounce((values) => {
    setValue('buyIn.min', values.min);
    setValue('buyIn.max', values.max);
    setRangeValues(values);
  }, 300);

  const DynamicListComponent = WithListStructure(ListStructure);

  return (
    <>
      <section className="flex flex-col gap-3 px-3">
        <img src={pokerBanner} className="rounded-3xl" />
        <button className="btn" onClick={modalRef.current?.openModal}>
          Ouvrir les filtres
        </button>
        {hasQueryFilters && (
          <button
            className="btn btn-ghost border-gray-300 text-primary-red"
            onClick={resetFilters}
          >
            Reset
          </button>
        )}
        <Modal
          ref={modalRef}
          header={<h2 className="tracking-wider capitalize">Filtres</h2>}
          content={
            <>
              <div className="flex justify-center gap-x-3">
                <div className="badge badge-outline px-3 py-4 border-primary-red text-primary-grey">
                  Prix min. :<b className="text-white ml-1">{min}</b>
                </div>
                <div className="badge badge-outline px-3 py-4 border-primary-red text-primary-grey">
                  Prix max. :<b className="text-white ml-1">{max}</b>
                </div>
              </div>
              <form
                method="dialog"
                className="flex flex-col text-center"
                onSubmit={(e) => handleSubmit(applyFilter)(e)}
              >
                <Controller
                  name="buyIn"
                  control={control}
                  render={({ field }) => (
                    <DoubleRange
                      {...field}
                      min={0}
                      max={10000}
                      onChange={handleRangeChange}
                    />
                  )}
                />

                <div className="form-control mt-5">
                  <label className="label cursor-pointer">
                    <span className="label-text">Remember me</span>
                    <input
                      {...register('triple')}
                      type="checkbox"
                      className="checkbox checkbox-primary"
                    />
                  </label>
                </div>
                <div className="mt-7">
                  <button
                    className="btn border-1 border-primary-red bg-slate-950 my-3 text-white"
                    type="submit"
                  >
                    Valider
                  </button>
                  {/* <p className="text-primary-red">{error}</p> */}
                </div>
              </form>
            </>
          }
        />
        <div>
          <ul className="flex flex-col gap-3">
            <HeaderTab className="mt-3" />
            {data && data.data && (
              <DynamicListComponent
                loading={processing}
                props={{
                  items: data.data,
                  type: data.listStructure,
                }}
              />
            )}
          </ul>
        </div>
      </section>
    </>
  );
};
