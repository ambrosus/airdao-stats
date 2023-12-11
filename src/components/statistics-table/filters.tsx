import { useState } from 'react';
import { Listbox } from '@headlessui/react';
import { Transition } from '@headlessui/react';

import ChevronDown from '@/components/icons/chevron-down-icon';

export const rangeList = [10, 20, 50, 250];

export function RangeList({ table }) {
  const [pageSize, setPageSize] = useState(
    table.getState().pagination.pageSize
  );

  return (
    <div className="relative">
      <Listbox
        value={pageSize}
        onChange={(value) => {
          setPageSize(value);
          table.setPageSize(value);
        }}
      >
        <Listbox.Button className="flex w-[90px] flex-1 items-center text-base font-medium justify-between border border-solid border-black-600/10 rounded-4xl bg-white p-4 text-black-700">
          {pageSize}
          <ChevronDown className="ml-2" />
        </Listbox.Button>
        <Transition
          enter="ease-out duration-200"
          enterFrom="opacity-0 translate-y-2"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 -translate-y-0"
          leaveTo="opacity-0 translate-y-2"
        >
          <Listbox.Options className="absolute w-full right-0 pt-1 pb-1 z-10 mt-2 rounded-lg origin-top-right bg-white border border-solid border-black-600/10">
            {rangeList.map((value) => (
              <Listbox.Option key={value} value={value}>
                {({ selected }) => (
                  <div
                    className={`block cursor-pointer px-4 py-1 text-base font-medium text-gray-900 transition ${
                      selected ? 'bg-black-600/10' : 'hover:bg-black-600/10'
                    }`}
                  >
                    {value}
                  </div>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </Listbox>
    </div>
  );
}
