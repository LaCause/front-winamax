import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { QueryFilter } from './useFilters.model';
import { formatFiltersToQuery } from '../../utils';

export const useFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState<QueryFilter[]>([]);
  const hasQueryFilters = Boolean(searchParams.size > 0);

  const resetFilters = () => {
    setSearchParams({});
    setFilters([]);
  };

  const updateFilters = (filters: string) => {
    const updatedParams = new URLSearchParams(searchParams);

    updatedParams.set('filters', filters);

    setSearchParams(filters);
  };

  return {
    resetFilters,
    updateFilters,
    searchParams,
    hasQueryFilters,
  };
};
