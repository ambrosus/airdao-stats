'use client';

import BlockList from '@/components/block-list';
import ActiveList from '@/components/block-list/active-list';
import MapChart from '@/components/map-chart';
import Notify from '@/components/notify';
import StatisticsTable from '@/components/statistics-table';
import Widget from '@/components/widget';

export default function Home() {
  return (
    <div className="mx-auto max-w-screen-xl w-full">
      <h4 className="mb-6">AirDAO Network node tracker</h4>
      <div className="grid grid-cols-5 gap-5 mb-4">
        <div className="panel col-span-3">
          <Notify />
        </div>
        <div className="panel col-span-2 flex items-center">
          <BlockList />
        </div>
      </div>
      <div className="flex flex-wrap mb-4">
        <div className="panel w-full">
          <ActiveList />
        </div>
      </div>
      <div className="mb-16">
        <div className="grid grid-cols-4 gap-5 mb-4 items-start">
          <div className="panel !px-3 !py-5 col-span-3">
            <MapChart />
          </div>
          <div className="panel !p-8 col-span-1">
            <Widget />
          </div>
        </div>
      </div>
      <StatisticsTable />
    </div>
  );
}
