'use client';

import BlockList from '@/components/block-list';
import ActiveList from '@/components/block-list/active-list';
import MapChart from '@/components/map-chart';
import Notify from '@/components/notify';
import StatisticsTable from '@/components/statistics-table';

export default function Home() {
  return (
    <div className="mx-auto max-w-screen-xl w-full px-5">
      <h4 className="mb-6">AirDAO Network node tracker</h4>
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-y-[20px] lg:gap-5 mb-4">
        <div className="panel col-span-3">
          <Notify />
        </div>
        <div className="panel col-span-2 flex items-center">
          <BlockList />
        </div>
      </div>
      <div className="panel mb-4">
        <ActiveList />
      </div>
      <div className="mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-y-[20px] lg:gap-5 mb-4 items-start">
          <MapChart />
        </div>
      </div>
      <StatisticsTable />
    </div>
  );
}
