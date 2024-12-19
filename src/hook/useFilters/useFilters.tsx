import { useLocation, useSearchParams } from 'react-router-dom';
import { FilterCodeList, FilterMapping } from './useFilters.model';
import { formatQueryFilters } from '../../utils';

export const useFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const hasQueryFilters = Boolean(searchParams.size > 0);

  const resetFilters = () => {
    setSearchParams({});
  };

  const updateFilters = (filters: string) => {
    const updatedParams = new URLSearchParams(searchParams);

    updatedParams.set('filters', filters);

    setSearchParams(filters);
  };

  const getFilters = <T extends FilterCodeList>(
    filterCode: T,
  ): FilterMapping[T] | undefined => {
    const filters = formatQueryFilters(location.search);
    const filter = filters.find((filter) => filter.code === filterCode);

    return filter as FilterMapping[T] | undefined;
  };

  return {
    getFilters,
    resetFilters,
    updateFilters,
    searchParams,
    hasQueryFilters,
  };
};
