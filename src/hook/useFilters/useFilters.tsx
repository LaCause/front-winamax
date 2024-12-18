import { useSearchParams } from 'react-router-dom';

export const useFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const hasQueryFilters = Boolean(searchParams.size > 0);

  const resetFilters = () => {
    setSearchParams({});
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
