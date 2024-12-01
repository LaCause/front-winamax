import { render } from '@testing-library/react';
import { addTick } from './Tab';
import { describe, expect, it } from 'vitest';

describe('addTick function', () => {
  it('returns expected JSX element when isActive is true', () => {
    const result = addTick(true);
    const { getByText } = render(result);
    expect(getByText('IN')).not.toBeNull();
  });

  it('returns null when isActive is false', () => {
    const result = addTick(false);
    expect(result).toBeNull();
  });
});
