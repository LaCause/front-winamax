export interface DoubleRangeHandle {
  getMinValue: () => number;
  getMaxValue: () => number;
}

export interface DoubleRangeProps {
  onChange?: (values: { min: number; max: number }) => void;
  min: number;
  max: number;
  defaultMin?: number;
  defaultMax?: number;
}
