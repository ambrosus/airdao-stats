// @ts-nocheck

import { createColumnHelper } from '@tanstack/react-table';
import { Tooltip } from '@airdao/ui-library';
import cn from 'clsx';

import { shortenAddress } from '@/utils';

import InfoSmallIcon from '@/components/icons/info-small-icon';
import LatencyIcon from '@/components/icons/latency-icon';
import PendingIcon from '@/components/icons/pending-icon';
import PeersIcon from '@/components/icons/peers-icon';
import BlockTimeIcon from '@/components/icons/block-time-icon';
import PropTimeIcon from '@/components/icons/prop-time-icon';
import AverageIcon from '@/components/icons/average-icon';
import {
  blockPropagationAvgFilter,
  blockPropagationFilter,
  lastBlockTime,
  propagationNodeAvgTimeClass,
  propagationTimeClass,
} from '@/lib/helpers/table';

const columnHelper = createColumnHelper();

const columns = [
  columnHelper.accessor('info.name', {
    header: () => (
      <div className="flex items-center">
        <span className="mr-1">Node Hash</span>
        <Tooltip message="Node Name">
          <InfoSmallIcon />
        </Tooltip>
      </div>
    ),
    cell: (info) => {
      return (
        <span className="text-blue-100">
          {info.getValue()?.replace('apollo', '')}
        </span>
      );
    },
  }),
  columnHelper.accessor('geo.country', {
    header: () => (
      <div className="flex items-center">
        <span className="mr-1">Country</span>
        <Tooltip message="Country Name">
          <InfoSmallIcon />
        </Tooltip>
      </div>
    ),
    cell: (info) => info.getValue() || '--',
  }),
  columnHelper.accessor('readable.latency', {
    header: () => (
      <div className="flex justify-center">
        <Tooltip message="Node Latency">
          <LatencyIcon />
        </Tooltip>
      </div>
    ),
    cell: (info) => <div className="text-center">{info.getValue()}</div>,
  }),
  columnHelper.accessor('stats.peers', {
    header: () => (
      <div className="flex justify-center">
        <Tooltip message="Peers">
          <PeersIcon />
        </Tooltip>
      </div>
    ),
    cell: (info) => <div className="text-center">{info.getValue()}</div>,
  }),
  columnHelper.accessor('stats.pending', {
    header: () => (
      <div className="flex justify-center">
        <Tooltip message="Pending Transaction">
          <PendingIcon />
        </Tooltip>
      </div>
    ),
    cell: (info) => <div className="text-center">{info.getValue()}</div>,
  }),
  columnHelper.accessor('stats.block.number', {
    header: () => (
      <div className="flex items-center">
        <span className="mr-1">Last Block</span>
        <Tooltip message="Last Block">
          <InfoSmallIcon />
        </Tooltip>
      </div>
    ),
    cell: (info) => `#${info.getValue()}`,
  }),
  columnHelper.accessor('stats.block', {
    header: () => (
      <div className="flex items-center">
        <span className="mr-1">Tx Hash</span>
        <Tooltip message="Tx Hash">
          <InfoSmallIcon />
        </Tooltip>
      </div>
    ),
    cell: (info) => (
      <span className="text-blue-100">
        {info.getValue() && shortenAddress(info.getValue().hash)}
      </span>
    ),
  }),
  columnHelper.accessor('stats.block.received', {
    header: () => (
      <div className="flex justify-center">
        <Tooltip message="Last Block Time">
          <BlockTimeIcon />
        </Tooltip>
      </div>
    ),
    cell: (info) => (
      <div className="text-center">{lastBlockTime(info.getValue())}</div>
    ),
  }),
  columnHelper.accessor('stats', {
    id: 'stats.one',
    header: () => (
      <div className="flex justify-center">
        <Tooltip message="Propagation Time">
          <PropTimeIcon />
        </Tooltip>
      </div>
    ),
    cell: (info) => {
      const stats = info.getValue();

      if (!stats) return <div></div>;
      const propClass = propagationTimeClass(stats, stats.block.number);

      return (
        <div className="flex items-center justify-center">
          <span
            className={cn(
              'mr-1 w-[6px] h-[6px] rounded-circle block',
              `bg-${propClass}-100`
            )}
          ></span>
          <span>{blockPropagationFilter(stats.block.propagation)}</span>
        </div>
      );
    },
  }),
  columnHelper.accessor('stats', {
    id: 'stats.two',
    header: () => (
      <div className="flex justify-center">
        <Tooltip message="Average Propagation Time">
          <AverageIcon />
        </Tooltip>
      </div>
    ),
    cell: (info) => {
      if (!info.getValue()) return '-';

      return (
        <div
          className={cn(
            'text-center',
            `text-${propagationNodeAvgTimeClass(info.getValue())}-100`
          )}
        >
          {blockPropagationAvgFilter(
            info.getValue(),
            info.getValue().block.number
          )}
        </div>
      );
    },
  }),
];

export default columns;
