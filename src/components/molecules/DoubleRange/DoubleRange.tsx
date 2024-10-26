import React, { forwardRef, useCallback, useMemo, useState } from 'react';
import { DoubleRangeHandle, DoubleRangeProps } from './DoubleRange.model';
import { debounce } from 'lodash';

export const DoubleRange = React.memo(
  forwardRef<DoubleRangeHandle, DoubleRangeProps>(({ min, max, onChange }) => {
    const [currentMinBuyIn, setCurrentMinBuyIn] = useState<number>(min);
    const [currentMaxBuyIn, setCurrentMaxBuyIn] = useState<number>(max);

    const percentMin = useMemo(
      () => (currentMinBuyIn / 10000) * 100,
      [currentMinBuyIn],
    );
    const percentMax = useMemo(
      () => (currentMaxBuyIn / 10000) * 100,
      [currentMaxBuyIn],
    );

    const handleMinPrice = (e: any) => {
      const value = Math.min(Number(e.target.value), currentMaxBuyIn - 1);
      setCurrentMinBuyIn(value);
      debouncedOnChange({ min: value, max: currentMaxBuyIn });
    };

    const handleMaxPrice = (e: any) => {
      const value = Math.max(Number(e.target.value), currentMinBuyIn + 1);
      setCurrentMaxBuyIn(value);
      debouncedOnChange({ min: currentMinBuyIn, max: value });
    };

    const debouncedOnChange = useCallback(
      debounce((values: { min: number; max: number }) => {
        onChange?.(values);
      }, 50),
      [onChange],
    );

    return (
      <>
        <div className="flex relative">
          <div
            className="slider-track relative"
            style={{
              background: `linear-gradient(to right, #dadae5 ${percentMin}% , #3264fe ${percentMin}% , #3264fe ${percentMax}%, #dadae5 ${percentMax}%)`,
            }}
          />
          <input
            type="range"
            value={currentMinBuyIn}
            id="slider-1"
            min={min}
            max={max}
            onChange={handleMinPrice}
          />
          <input
            type="range"
            value={currentMaxBuyIn}
            id="slider-2"
            min={min}
            max={max}
            onChange={handleMaxPrice}
          />
        </div>
      </>
    );
  }),
);
