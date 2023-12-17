import { memo, useState } from 'react';

import { RangeList } from '@/components/statistics-table/filters';
import Pagination from '@/components/statistics-table/pagination';
import SearchInput from '@/components/ui/search-bar';
import { useData } from '@/contexts/data/use-data';

const TableHeader = ({
  table,
  pageCount,
}: {
  table: any;
  pageCount: number;
}) => {
  const [value, setValue] = useState<string>('');
  const { apolloInfo } = useData();

  return (
    <div className="mb-8 flex flex-col sm:flex-row items-center justify-between">
      <div className="mb-8 sm:mb-0">
        <h4>A total of {apolloInfo.online} nodes</h4>
      </div>
      <div className="flex relative flex-col sm:flex-row flex-wrap items-center gap-8">
        <SearchInput value={value} setValue={setValue} />
        <RangeList table={table} />
        <Pagination table={table} pageCount={pageCount} />
      </div>
    </div>
  );
};

export default memo(TableHeader);
