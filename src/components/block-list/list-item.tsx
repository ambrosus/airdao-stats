import cn from 'clsx';

import { BlockListItem } from '@/types';

const ListItem = ({ title, value, className, icon: Icon }: BlockListItem) => {
  return (
    <div className={cn('flex items-center', className)}>
      {Icon && (
        <div className="flex-shrink-0 round">
          <Icon />
        </div>
      )}
      <div>
        <h6 className="mb-2 uppercase text-neutral-200 font-medium">{title}</h6>
        <b className="text-5.5 leading-7 uppercase text-black-400">{value}</b>
      </div>
    </div>
  );
};

export default ListItem;
