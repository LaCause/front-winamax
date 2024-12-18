import { render, fireEvent, waitFor, cleanup } from '@testing-library/react';
import { Tab } from './Tab';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { Tournament } from '../../../hook/useWorker/useWorker.model';

const tournament: Tournament = {
  tournamentId: 1,
  name: 'Tournament 1',
  buyIn: 10,
  flag: 'FR',
  icons: ['mst'],
  limit: 'NLHE',
  startDate: new Date('2023-01-01T00:00:00.000Z').getTime(),
  prizepool: 100,
  nbPlayers: 10,
};

describe('handleClick', () => {
  beforeEach(() => {
    cleanup(); // Nettoie le DOM entre les tests
    vi.clearAllMocks(); // Réinitialise tous les mocks de vitest
  });

  it('calls onActiveTab with correct arguments', () => {
    const onActiveTab = vi.fn();

    const isActive = false;
    const { getByRole } = render(
      <Tab
        tournament={tournament}
        isActive={isActive}
        onActiveTab={onActiveTab}
      />,
    );
    const tab = getByRole('listitem');
    fireEvent.click(tab);
    expect(onActiveTab).toHaveBeenCalledTimes(1);
    expect(onActiveTab).toHaveBeenCalledWith(true, tournament);
  });

  it('does not call onActiveTab when it is undefined', () => {
    const isActive = false;
    const { getByRole } = render(
      <Tab tournament={tournament} isActive={isActive} />,
    );
    const tab = getByRole('listitem');
    fireEvent.click(tab);
    expect(() => tab.click()).not.toThrow();
  });

  it('does not throw an error when onActiveTab is undefined', () => {
    const isActive = false;
    const { getByRole } = render(
      <Tab tournament={tournament} isActive={isActive} />,
    );
    const tab = getByRole('listitem');
    expect(() => fireEvent.click(tab)).not.toThrow();
  });
});
