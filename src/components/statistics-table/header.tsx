import { memo, useState } from 'react';

import { RangeList } from '@/components/statistics-table/filters';
import Pagination from '@/components/statistics-table/pagination';
import SearchInput from '@/components/ui/search-bar/search-input';
import { useData } from '@/contexts/data/use-data';

const TableHeader = ({ table, pageCount }) => {
  const [value, setValue] = useState<string>('');
  const { nodesActive } = useData();

  return (
    <div className="mb-8 flex items-center justify-between">
      <div>
        <h4>A total of {nodesActive} nodes</h4>
      </div>
      <div className="flex flex-wrap items-center gap-8">
        <SearchInput value={value} setValue={setValue} />
        <RangeList table={table} />
        <Pagination table={table} pageCount={pageCount} />
      </div>
    </div>
  );
};

export default memo(TableHeader);
