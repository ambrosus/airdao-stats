import Input from '@/components/ui/forms/input';

import SearchIcon from '@/components/icons/search-icon';
import ResetIcon from '@/components/icons/reset-icon';

import { ISearch } from '@/types';

const SearchInput = ({ value, setValue }: ISearch) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <div className="flex items-center">
      <div className="relative w-full">
        <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
          <SearchIcon />
        </div>
        <div className="flex-1">
          <Input
            onChange={handleChange}
            value={value}
            className="pl-12 pr-11"
            placeholder="Search"
          />
        </div>
        {value && (
          <button
            type="button"
            onClick={() => setValue('')}
            className="absolute inset-y-0 right-0 flex items-center pr-4"
          >
            <ResetIcon />
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchInput;
