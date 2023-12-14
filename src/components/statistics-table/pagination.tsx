import cn from 'clsx';

import ArrowRight from '@/components/icons/arrow-right-icon';

// const PageView = (props) => {
//   const {
//     page,
//     selected,
//     getEventListener,
//     pageSelectedHandler,
//     pageLabelBuilder,
//   } = props;

//   if (selected) {
//     return (
//       <li>
//         <a className={''} {...getEventListener(pageSelectedHandler)}>
//           {pageLabelBuilder(page)}
//         </a>
//       </li>
//     );
//   }
// };

// const getPageElement = (index) => {
//   const selected = 1;

//   return (
//     <PageView
//       key={index}
//       pageSelectedHandler={handlePageSelected.bind(null, index)}
//       selected={selected === index}
//       page={index + 1}
//       getEventListener={getEventListener}
//     />
//   );
// };

// const pagination = (pageCount) => {
//   const items = [];
//   const pageRangeDisplayed = 5;
//   const marginPagesDisplayed = 2;
//   const breakLabel = '...';
//   const breakAriaLabels = {
//     forward: 'Jump forward',
//     backward: 'Jump backward',
//   };

//   const breakClassName = '';
//   const selected = 1;

//   if (pageCount <= pageRangeDisplayed) {
//     for (let index = 0; index < pageCount; index++) {
//       items.push(getPageElement(index));
//     }
//   } else {
//     let leftSide = pageRangeDisplayed / 2;
//     let rightSide = pageRangeDisplayed - leftSide;

//     if (selected > pageCount - pageRangeDisplayed / 2) {
//       rightSide = pageCount - selected;
//       leftSide = pageRangeDisplayed - rightSide;
//     } else if (selected < pageRangeDisplayed / 2) {
//       leftSide = selected;
//       rightSide = pageRangeDisplayed - leftSide;
//     }

//     let createPageView = (index) => getPageElement(index);
//     let index;
//     let breakView;

//     const pagesBreaking: any = [];
//     for (index = 0; index < pageCount; index++) {
//       const page = index + 1;

//       if (page <= marginPagesDisplayed) {
//         pagesBreaking.push({
//           type: 'page',
//           index,
//           display: createPageView(index),
//         });
//         continue;
//       }

//       if (page > pageCount - marginPagesDisplayed) {
//         pagesBreaking.push({
//           type: 'page',
//           index,
//           display: createPageView(index),
//         });
//         continue;
//       }

//       const adjustedRightSide =
//         selected === 0 && pageRangeDisplayed > 1 ? rightSide - 1 : rightSide;

//       if (
//         index >= selected - leftSide &&
//         index <= selected + adjustedRightSide
//       ) {
//         pagesBreaking.push({
//           type: 'page',
//           index,
//           display: createPageView(index),
//         });
//         continue;
//       }

//       if (
//         breakLabel &&
//         pagesBreaking.length > 0 &&
//         pagesBreaking[pagesBreaking.length - 1].display !== breakView &&
//         (pageRangeDisplayed > 0 || marginPagesDisplayed > 0)
//       ) {
//         const useBreakAriaLabel =
//           index < selected ? breakAriaLabels.backward : breakAriaLabels.forward;
//         breakView = (
//           <BreakView
//             key={index}
//             breakAriaLabel={useBreakAriaLabel}
//             breakLabel={breakLabel}
//             breakClassName={breakClassName}
//             breakLinkClassName={''}
//             breakHandler={this.handleBreakClick.bind(null, index)}
//             getEventListener={this.getEventListener}
//           />
//         );
//         pagesBreaking.push({ type: 'break', index, display: breakView });
//       }
//     }
//     // Second pass: we remove breaks containing one page to the actual page.
//     pagesBreaking.forEach((pageElement, i) => {
//       let actualPageElement = pageElement;
//       if (
//         pageElement.type === 'break' &&
//         pagesBreaking[i - 1] &&
//         pagesBreaking[i - 1].type === 'page' &&
//         pagesBreaking[i + 1] &&
//         pagesBreaking[i + 1].type === 'page' &&
//         pagesBreaking[i + 1].index - pagesBreaking[i - 1].index <= 2
//       ) {
//         actualPageElement = {
//           type: 'page',
//           index: pageElement.index,
//           display: createPageView(pageElement.index),
//         };
//       }
//       // We add the displayed elements in the same pass, to avoid another iteration.
//       items.push(actualPageElement.display);
//     });
//   }

//   return items;
// };

const Paginate = ({ table, pageCount }) => {
  return (
    <nav>
      <ul className="flex items-center text-base gap-1">
        <li>
          <button
            onClick={() => table.previousPage()}
            className={cn(
              'flex items-center justify-center rounded-2 h-9 w-9 border border-solid bg-black-200/30',
              {
                'shadow-button border-black-600/10': table.getCanPreviousPage(),
                'pointer-events-none text-black-400/30 border-transparent':
                  !table.getCanPreviousPage(),
              }
            )}
            disabled={!table.getCanPreviousPage()}
          >
            <ArrowRight className="rotate-180" />
          </button>
        </li>
        {/* <li>
          <button className="flex items-center justify-center rounded-2 text-sm font-medium h-7 w-7 text-black-500 bg-white border border-solid border-black-600/10">
            1
          </button>
        </li> */}
        {/* <li>
          <button className="flex items-center justify-center rounded-2 text-sm font-medium h-7 w-7 text-black-500/50 border border-solid border-transparent">
            2
          </button>
        </li> */}
        {/* {pagination(pageCount)} */}
        <li>
          <button
            onClick={() => table.nextPage()}
            className={cn(
              'flex items-center justify-center rounded-2 h-9 w-9 border border-solid bg-black-200/30',
              {
                'shadow-button border-black-600/10': table.getCanNextPage(),
                'pointer-events-none text-black-400/30 border-transparent':
                  !table.getCanNextPage(),
              }
            )}
            disabled={!table.getCanNextPage()}
          >
            <ArrowRight />
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Paginate;
