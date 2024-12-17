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
    console.log('HOCS');
    console.log(loading);
    console.log('//////', props.items.slice(0, 1));
    if (loading) return <>LOADING ...</>;
    return <Component {...props} />;
  };
};
