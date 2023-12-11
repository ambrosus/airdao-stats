import ListItem from './list-item';

const data = [
  {
    continent: 'Asia',
    stakeSizes: '10m',
  },
  {
    continent: 'Africa',
    stakeSizes: '10m',
  },
  {
    continent: 'North America',
    stakeSizes: '10m',
  },
  {
    continent: 'South America',
    stakeSizes: '10m',
  },
  {
    continent: 'Antarctica',
    stakeSizes: '10m',
  },
  {
    continent: 'Europe',
    stakeSizes: '10m',
  },
  {
    continent: 'Australia',
    stakeSizes: '10m',
  },
];

const List = () => {
  return (
    <ol className="flex flex-col list-decimal">
      {data.map((item, index) => (
        <ListItem key={item.continent} index={index} item={item} />
      ))}
    </ol>
  );
};

export default List;
