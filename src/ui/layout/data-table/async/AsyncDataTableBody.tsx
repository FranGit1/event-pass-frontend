import 'twin.macro';

import { Maybe } from '../../../../types';
import { TableInstance } from 'react-table';
import tw from 'twin.macro';

interface IAsyncDataTableBodyProps<T> {
  tableInstance: TableInstance;
  onRowClick?: (data: T, index: number) => void;
  activeRowIndex: Maybe<number>;
}

export const AsyncDataTableBody = (props: IAsyncDataTableBodyProps<any>) => {
  const { tableInstance, activeRowIndex, onRowClick } = props;
  const { getTableBodyProps, prepareRow, page } = tableInstance;
  return (
    <tbody {...getTableBodyProps()}>
      {page.map((row) => {
        prepareRow(row);
        const isSelected = activeRowIndex === row.index;
        const isLowerNeigbourSelected = activeRowIndex === row.index + 1;
        return (
          <tr
            {...row.getRowProps()}
            css={[
              tw` cursor-pointer text-black border-transparent border-2 border-b-0.3 border-b-gray px-4  `,
              isLowerNeigbourSelected && tw`border-b-2 border-b-transparent`,
              isSelected && tw` hover:(rounded-full shadow-md transition-all duration-150)`,
              !isSelected &&
                tw`hover:(shadow-tableRow transition-all duration-300 border-2 border-transparent rounded-xl)`,
              isSelected && tw`border-2 border-primary rounded-full  text-black `
            ]}
            onClick={() => {
              onRowClick && onRowClick(row.original, row.index);
            }}
          >
            {row.cells.map((cell) => {
              return (
                <td {...cell.getCellProps()} css={[tw`bg-inherit px-2  py-4 text-left font-normal flex min-w-full	`]}>
                  {/* @ts-ignore */}
                  {cell.column.cell(cell.row.original)}
                </td>
              );
            })}
          </tr>
        );
      })}
    </tbody>
  );
};
