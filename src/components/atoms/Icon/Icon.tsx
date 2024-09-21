import React, { cloneElement } from 'react';
import { IconProps } from './icon.model';
import { ICONS } from './icons';

export const Icon: React.FC<IconProps> = ({ name, className }) => {
  const SvgComponent = ICONS[name];

  const clonedElement = cloneElement(SvgComponent(), { className });

  if (!SvgComponent) {
    return null;
  }

  return clonedElement;
};
