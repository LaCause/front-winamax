import React from 'react';
import {
  ListStructure,
  StructureTypes,
} from '../../components/molecules/ListStructure/ListStructure';

export const WithListStructure = (Component: React.ComponentType<any>) => {
  return ({ props: { type, items, onClick } }: { props: ListStructure }) => {
    if (items) return <Component type={type} items={items} onClick={onClick} />;
  };
};
