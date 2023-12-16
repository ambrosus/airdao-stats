import BoxIcon from '@/components/icons/box-icon';
import ListIcon from '@/components/icons/list-icon';
import ListItem from '@/components/block-list/list-item';

import { useData } from '@/contexts/data/use-data';
import { blockTimeFilter, formatBestBlockNumber } from '@/lib/helpers/table';

const BlockList = () => {
  const { bestBlock, lastBlock } = useData();

  return (
    <div className="grid grid-cols-2 gap-7 md:place-items-center w-full">
      <ListItem
        title="Best Block"
        value={formatBestBlockNumber(bestBlock)}
        icon={BoxIcon}
        className="gap-2"
      />
      <ListItem
        title="Last Block"
        value={blockTimeFilter(lastBlock)}
        icon={ListIcon}
        className="gap-2"
      />
    </div>
  );
};

export default BlockList;
