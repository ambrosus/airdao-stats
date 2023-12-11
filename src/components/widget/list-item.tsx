import { WidgetListItem } from '@/types';

const ListItem = ({
  item,
  index,
}: {
  index: number;
  item: WidgetListItem;
  className?: string;
}) => {
  const { continent, stakeSizes } = item;
  return (
    <li className="flex py-3 list-decimal list-inside items-center text-xs leading-5 border-b-1 border-solid border-b-black-200 first:pt-0 last:pb-0 last:border-b-0">
      <span className="flex-1">
        {index + 1}
        <span className="ml-4">{continent}</span>
      </span>
      <span>{stakeSizes}</span>
    </li>
  );
};

export default ListItem;
