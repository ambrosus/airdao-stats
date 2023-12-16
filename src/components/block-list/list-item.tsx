import cn from 'clsx';

import { BlockListItem } from '@/types';

const ListItem = ({
  title,
  value,
  valueClassName = '',
  className,
  icon: Icon,
}: BlockListItem) => {
  return (
    <div className={cn('flex flex-col', className)}>
      <div className="flex items-center mb-2">
        {Icon && <Icon className="mr-2" />}
        <h6 className="uppercase text-neutral-200 font-medium">{title}</h6>
      </div>
      <b
        className={cn(
          'text-4 xl:text-5.5 leading-7 uppercase text-black-400',
          valueClassName
        )}
      >
        {value}
      </b>
    </div>
  );
};

export default ListItem;
