import { useState } from 'react';

import ListItem from './list-item';
import { useData } from '@/contexts/data/use-data';
import { avgTimeFilter, gasPriceFilter } from '@/lib/helpers/table';

const ActiveList = () => {
  const { nodesActive, nodesTotal, bestStats, latency } = useData();
  const [avgBlockTime, setAvgBlockTime] = useState(0);

  // useEffect(() => {
  //   fetch('https://explorer-api.ambrosus-test.io/info/')
  //     .then((response) => {
  //       return response.json();
  //     })
  //     .then((data) => {
  //       setAvgBlockTime(data.avgBlockTime);
  //     });
  // }, []);

  const gasPrice = bestStats && gasPriceFilter(bestStats.gasPrice);
  const gasLimit = bestStats && bestStats.block.gasLimit;

  return (
    <div className="flex flex-wrap items-center [&>*:not(:last-child)]:basis-1/5 justify-around">
      <ListItem
        title="Active Nodes"
        value={`${nodesActive}/${nodesTotal}`}
        className="flex-col"
      />
      <ListItem title="Gas Price" value={gasPrice} className="flex-col" />
      <ListItem
        title="Gas Limit"
        value={`${gasLimit} gas`}
        className="flex-col"
      />
      <ListItem
        title="Page Latency"
        value={`${latency} ms`}
        className="flex-col"
      />
      <ListItem
        title="Avg Block Time"
        value={avgTimeFilter(avgBlockTime)}
        className="flex-col"
      />
    </div>
  );
};

export default ActiveList;
