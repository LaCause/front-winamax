import React from 'react';
import { ListStructureInterface } from '../../components/molecules/ListStructure/ListStructure.model';

export const WithListStructure = (
  Component: React.ComponentType<any>,
  loading: boolean,
) => {
  return ({
    props: { type, items, onClick },
  }: {
    props: ListStructureInterface;
  }) => {
    if (loading) return <>LOADING ...</>;
    if (items) return <Component type={type} items={items} onClick={onClick} />;
  };
};
