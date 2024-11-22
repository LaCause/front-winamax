import React from 'react';
import {
  ListStructure,
  StructureTypes,
} from '../../components/molecules/ListStructure/ListStructure';

export const WithListStructure = (
  Component: React.ComponentType<any>,
  loading: boolean,
) => {
  return ({ props: { type, items, onClick } }: { props: ListStructure }) => {
    if (loading) return <>Loading...</>;
    if (items) return <Component type={type} items={items} onClick={onClick} />;
  };
};
