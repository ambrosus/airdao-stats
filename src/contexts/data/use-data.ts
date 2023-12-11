import { useContext } from 'react';

import { DataValues } from './types';
import DataContext from './context';

export const useData = () => {
  const context = useContext(DataContext);

  if (context === undefined) {
    throw new Error('useData must be used within DataContext');
  }
  return context as DataValues;
};
