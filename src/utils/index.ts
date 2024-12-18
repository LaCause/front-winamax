import {
  FilterInput,
  FiltersCode,
  FilterTypes,
  QueryFilter,
} from '../hook/useFilters/useFilters.model';
import { Tournament } from '../hook/useWorker/useWorker.model';

export const formatDate = (startDate: number) => {
  const daysOfWeek = ['Dim.', 'Lun.', 'Mar.', 'Mer.', 'Jeu.', 'Ven.', 'Sam.'];
  const options = {
    hour: 'numeric',
    minute: 'numeric',
  };
  const date = new Date(startDate);
  return (
    daysOfWeek[date.getDay()] +
    ' ' +
    date.toLocaleTimeString('fr-FR', options as Intl.DateTimeFormatOptions)
  );
};

export const processChunk = async (
  tournaments: Tournament[],
  chunkSize: number,
  callback: (tournaments: Tournament[]) => void,
) => {
  let index = 0;
  const processNextChunk = () => {
    const chunk = tournaments.slice(index, index + chunkSize);
    callback(chunk);
    index += chunkSize;
    if (index < tournaments.length) {
      setTimeout(processNextChunk, 0);
    }
  };

  processNextChunk();
};

export const formatCurrency = (number: number) =>
  new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
  }).format(number);

export const parseFromString = (
  element: string,
  type: DOMParserSupportedType,
) => new DOMParser().parseFromString(element, type);

export const formatQueryFilters = (queryFilters: string): QueryFilter[] => {
  const filters = queryFilters.split('&');

  return filters.map((filter): QueryFilter => {
    const [code, value] = filter.split('=');
    switch (code) {
      case FiltersCode.buyIn:
        return {
          code: FiltersCode.buyIn,
          type: FilterTypes.RANGE,
          value: {
            min: Number(value.split('-')[0]),
            max: Number(value.split('-')[1]),
          },
        };

      default:
        return {
          code: FiltersCode.triple,
          type: FilterTypes.BOOLEAN,
          value: true,
        };
    }
  });
};

export const formatFiltersToQuery = (filters: FilterInput): string => {
  const formattedFilters = Object.entries(filters)
    .map(([key, value]) => {
      if (
        typeof value === 'object' &&
        value !== null &&
        'min' in value &&
        'max' in value
      ) {
        return `${key}=${value.min}-${value.max}`;
      }

      return `${key}=${value}`;
    })
    .join('&');

  return encodeURI(formattedFilters);
};

export const loadJsonDataTournaments = async () =>
  (await import('../../sample-poker.json')).default;
