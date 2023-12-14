import { createColumnHelper } from '@tanstack/react-table';
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
  propagationTimeClass,
} from '@/lib/helpers/table';

const columnHelper = createColumnHelper();

const columns = [
  columnHelper.accessor('info.name', {
    header: () => (
      <span className="flex items-center">
        Node Hash <InfoSmallIcon className="ml-1" />
      </span>
    ),
    cell: (info) => {
      return <a href="#">{info.getValue().replace('apollo', '')}</a>;
    },
  }),
  // columnHelper.accessor('info.node', {
  //   header: () => (
  //     <span className="flex items-center">
  //       Version <InfoSmallIcon className="ml-1" />
  //     </span>
  //   ),
  // }),
  columnHelper.accessor('geo.country', {
    header: () => (
      <span className="flex items-center">
        Country <InfoSmallIcon className="ml-1" />
      </span>
    ),
    cell: (info) => info.getValue() || '--',
  }),
  // columnHelper.accessor('info.ip', {
  //   header: () => (
  //     <span className="flex items-center">
  //       Host <InfoSmallIcon className="ml-1" />
  //     </span>
  //   ),
  // }),
  columnHelper.accessor('readable.latency', {
    header: () => <LatencyIcon className="mx-auto" />,
    cell: (info) => <div className="text-center">{info.getValue()}</div>,
  }),
  columnHelper.accessor('stats.peers', {
    header: () => <PeersIcon className="mx-auto" />,
    cell: (info) => <div className="text-center">{info.getValue()}</div>,
  }),
  columnHelper.accessor('stats.pending', {
    header: () => <PendingIcon className="mx-auto" />,
    cell: (info) => <div className="text-center">{info.getValue()}</div>,
  }),
  columnHelper.accessor('stats.block.number', {
    header: () => (
      <span className="flex items-center">
        Last Block <InfoSmallIcon className="ml-1" />
      </span>
    ),
    cell: (info) => `#${info.getValue()}`,
  }),
  columnHelper.accessor('stats.block.hash', {
    header: () => (
      <span className="flex items-center">
        Tx Hash <InfoSmallIcon className="ml-1" />
      </span>
    ),
    cell: (info) => <a href="#">{shortenAddress(info.getValue())}</a>,
  }),
  columnHelper.accessor('stats.block.received', {
    header: () => <BlockTimeIcon className="mx-auto" />,
    cell: (info) => (
      <div className="text-center">{lastBlockTime(info.getValue())}</div>
    ),
  }),
  columnHelper.accessor('stats', {
    id: 'stats.one',
    header: () => <PropTimeIcon className="mx-auto" />,
    cell: (info) => {
      const stats = info.getValue();
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
    header: () => <AverageIcon className="mx-auto" />,
    cell: (info) => (
      <div className="text-center">
        {blockPropagationAvgFilter(
          info.getValue(),
          info.getValue().block.number
        )}
      </div>
    ),
  }),
];

export default columns;
