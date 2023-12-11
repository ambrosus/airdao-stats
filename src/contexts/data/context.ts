import { createContext } from 'react';

import { DataValues } from './types';

const DataContext = createContext<DataValues | null>(null);

export default DataContext;
