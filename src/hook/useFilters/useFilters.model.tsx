export const FilterTypes = {
  RANGE: 'range',
  BOOLEAN: 'boolean',
} as const;

export const FiltersCode = {
  buyIn: 'buyIn',
  triple: 'triple',
} as const;

// Mapper les types de filtres selon le code
export const FilterTypeMapping = {
  buyIn: FilterTypes.RANGE,
  triple: FilterTypes.BOOLEAN,
} as const;

export type FilterCodeList = keyof typeof FiltersCode;

export interface QueryFilterBase {
  code: keyof typeof FiltersCode;
}

interface RangeFilter extends QueryFilterBase {
  type: typeof FilterTypes.RANGE;
  value: {
    min: number;
    max: number;
  };
}

interface BooleanFilter extends QueryFilterBase {
  type: typeof FilterTypes.BOOLEAN;
  value: boolean;
}

export type QueryFilter = RangeFilter | BooleanFilter;

export type FilterInput = {
  [K in keyof typeof FiltersCode]: (typeof FilterTypeMapping)[K] extends typeof FilterTypes.RANGE
    ? RangeFilter['value']
    : (typeof FilterTypeMapping)[K] extends typeof FilterTypes.BOOLEAN
      ? boolean
      : never;
};

export interface FilterMapping {
  buyIn: RangeFilter;
  triple: BooleanFilter;
}
