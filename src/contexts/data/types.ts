import { INode } from '@/types';

export type DataValues = {
  nodes: INode[];
  bestBlock: number;
  lastBlock: number;
  avgBlockTime: number;
  nodesTotal: number;
  nodesActive: number;
  bestStats: {
    [key: string]: any;
  };
  latency: number;
};
