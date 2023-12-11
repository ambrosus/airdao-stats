import List from './list';

const Widget = () => {
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
      <List />
    </div>
  );
};

export default Widget;
