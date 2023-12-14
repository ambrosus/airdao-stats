import { IContinentItem } from '@/types';
import List from './list';

const WidgetList = ({ data }: { data: IContinentItem[] }) => {
  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between mb-5">
        <span className="text-3 leading-5 uppercase font-medium text-neutral-100">
          Continent
        </span>
        <span className="text-3 leading-5 uppercase font-medium text-neutral-100">
          Stake Sizes
        </span>
      </div>
      {data.length > 0 && <List data={data} />}
    </div>
  );
};

export default WidgetList;
