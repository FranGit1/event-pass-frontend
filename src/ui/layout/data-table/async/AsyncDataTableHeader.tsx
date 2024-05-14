import 'twin.macro';

import { TiArrowSortedDown, TiArrowSortedUp, TiArrowUnsorted } from 'react-icons/ti';

import { TableInstance } from 'react-table';
import { Typography } from '../../../Typography';
import { css } from '@emotion/react';
import tw from 'twin.macro';

interface IAsyncDataTableHeaderProps {
  tableInstance: TableInstance;
  sortKey: any;
  sortOrder?: 'ASC' | 'DESC';
  setSortKey: (value: string) => void;
}

export const AsyncDataTableHeader = (props: IAsyncDataTableHeaderProps) => {
  const { tableInstance, sortKey, sortOrder, setSortKey } = props;
  const { headerGroups } = tableInstance;
  const iconStyle = tw`h-5 w-5 text-gray-100`;

  return (
    <thead>
      {headerGroups.map((headerGroup) => (
        <tr {...headerGroup.getHeaderGroupProps()} css={css([tw``])}>
          {headerGroup.headers.map((column) => {
            const disabledSorting = column.disableSortBy ?? false;
            const isSorted = column.id === sortKey;
            const isSortedDesc = sortOrder === 'DESC';
            return (
              <th
                {...column.getHeaderProps(column.getSortByToggleProps())}
                onClick={() => {
                  if (!disabledSorting) {
                    setSortKey(column.id);
                  }
                }}
                css={[tw`bg-white  py-4 font-normal`]}
              >
                <div tw="flex items-center gap-x-1">
                  <Typography.Body containerCss={[tw`text-black font-600 mr-2`, isSorted && tw`text-black`]}>
                    {column.render('Header')}
                  </Typography.Body>
                  <div>
                    {!disabledSorting && (
                      <span>
                        {isSorted ? (
                          isSortedDesc ? (
                            <TiArrowSortedDown css={[iconStyle, tw`text-primary-100`]} />
                          ) : (
                            <TiArrowSortedUp css={[iconStyle, tw`text-primary-100`]} />
                          )
                        ) : (
                          <TiArrowUnsorted css={[iconStyle, tw`text-gray-100`]} />
                        )}
                      </span>
                    )}
                  </div>
                </div>
              </th>
            );
          })}
        </tr>
      ))}
    </thead>
  );
};
