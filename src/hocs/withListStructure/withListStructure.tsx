import React from 'react';
import { ListStructureInterface } from '../../components/molecules/ListStructure/ListStructure.model';

type WithLoadingProps<T> = {
  loading: boolean;
  props: T;
};

export const WithListStructure = <T extends ListStructureInterface>(
  Component: React.ComponentType<T>,
) => {
  return ({ loading, props }: WithLoadingProps<T>) => {
    if (loading) return <>LOADING ...</>;
    return <Component {...props} />;
  };
};
