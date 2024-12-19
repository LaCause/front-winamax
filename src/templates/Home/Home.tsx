import pokerBanner from '/images/tournois.jpg';
import { Modal } from '../../components/molecules/Modal/Modal';
import { useCallback, useMemo, useRef } from 'react';
import { ModalHandle } from '../../components/molecules/Modal/Modal.model';
import { formatFiltersToQuery } from '../../utils';
import { DoubleRange } from '../../components/molecules/DoubleRange/DoubleRange';
import { WithListStructure } from '../../hocs/withListStructure/withListStructure';
import { ListStructure } from '../../components/molecules/ListStructure/ListStructure';
import { useWorker } from '../../hook/useWorker/useWorker';
import { useFilters } from '../../hook/useFilters/useFilters';
import { Controller, useForm } from 'react-hook-form';
import { FilterInput } from '../../hook/useFilters/useFilters.model';
import { HeaderTab } from '../../components/molecules/HeaderTab/HeaderTab';
import {
  WORKER_KEY,
  WorkerMessageStates,
  WorkerMessageTypes,
} from '../../hook/useWorker/useWokrer.const';
import {
  ListStructureInterface,
  StructureTypes,
} from '../../components/molecules/ListStructure/ListStructure.model';
import { Badge } from '../../components/molecules/Badge/Badge';

// @TODO: Add tinder with bet logic :
// -> Swipe left / right : Team 1 vs Team 2
// -> Swipe up / down : Team 1 vs Team 3
// -> Swipe down / up : Team 2 vs Team 3

export const Home = () => {
  const { updateFilters, resetFilters, searchParams, getFilters } =
    useFilters();
  const { data, processing, runWorkerMessage } = useWorker();
  const { control, handleSubmit, getValues, setValue, register } =
    useForm<FilterInput>();

  const modalRef = useRef<ModalHandle>(null);
  const rangeValuesRef = useRef({
    min: getFilters('buyIn')?.value.min ?? 0,
    max: getFilters('buyIn')?.value.max ?? 10000,
  });

  const applyFilter = async () => {
    const formValues = getValues();
    const query = formatFiltersToQuery(formValues);
    updateFilters(query);
    runWorkerMessage({
      key: WORKER_KEY,
      type: WorkerMessageTypes.FILTER_DATA,
      state: WorkerMessageStates.WORKER_INPUT,
      data: [],
      query,
      listStructure: StructureTypes.GRID,
    });
    modalRef.current?.closeModal();
  };

  const handleRangeReset = useCallback(() => {
    resetFilters();
    runWorkerMessage({
      key: WORKER_KEY,
      type: WorkerMessageTypes.LOAD_DATA,
      state: WorkerMessageStates.WORKER_INPUT,
      data: [],
      query: '',
      listStructure: StructureTypes.GRID,
    });
  }, [resetFilters, runWorkerMessage]);

  const handleRangeApply = useCallback(
    (values: any) => {
      rangeValuesRef.current = values;
      setValue('buyIn.min', values.min);
      setValue('buyIn.max', values.max);
    },
    [setValue],
  );

  const listStructureProps = useMemo<ListStructureInterface>(
    () => ({
      items: data?.data ?? [],
      type: data?.listStructure ?? StructureTypes.GRID,
    }),
    [data?.data, data?.listStructure],
  );

  const DynamicListComponent = useMemo(
    () => WithListStructure(ListStructure),
    [],
  );

  console.log('HOME');

  return (
    <>
      <section className="flex flex-col gap-3 px-3">
        <img src={pokerBanner} className="rounded-3xl" />
        <button className="btn" onClick={modalRef.current?.openModal}>
          Ouvrir les filtres
        </button>
        {searchParams.size > 0 && (
          <button
            className="btn btn-ghost border-gray-300 text-primary-red"
            onClick={handleRangeReset}
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
                <Badge title="Prix min" valueRef={rangeValuesRef} field="min" />
                <Badge title="Prix min" valueRef={rangeValuesRef} field="max" />
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
                      defaultMin={getFilters('buyIn')?.value.min}
                      defaultMax={getFilters('buyIn')?.value.max}
                      onChange={handleRangeApply}
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
                props={listStructureProps}
              />
            )}
          </ul>
        </div>
      </section>
    </>
  );
};
