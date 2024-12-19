import React, { useEffect, useState } from 'react';
import { BadgeProps } from './Badge.model';

export const Badge: React.FC<BadgeProps> = React.memo(
  ({ title, valueRef, field }) => {
    const [value, setValue] = useState(valueRef.current[field]);

    useEffect(() => {
      const interval = setInterval(() => {
        // Mettre à jour uniquement si la valeur change
        if (valueRef.current[field] !== value) {
          setValue(valueRef.current[field]);
        }
      }, 50); // Vérifie les changements toutes les 50ms

      return () => clearInterval(interval);
    }, [valueRef, field, value]);

    return (
      <div className="badge badge-outline px-3 py-4 border-primary-red text-primary-grey">
        {title} :<b className="text-white ml-1">{value}</b>
      </div>
    );
  },
);
