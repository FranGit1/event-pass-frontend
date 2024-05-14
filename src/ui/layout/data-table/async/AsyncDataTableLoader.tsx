import "twin.macro";

import { Skeleton } from "../../../indicators/Skeleton";
import { TableInstance } from "react-table";
import tw from "twin.macro";

interface IAsyncDataTableLoaderProps {
  tableInstance: TableInstance;
}

export const AsyncDataTableLoader = (props: IAsyncDataTableLoaderProps) => {
  const { tableInstance } = props;
  const {
    getTableBodyProps,
    prepareRow,
    // @ts-ignore
    page,
  } = tableInstance;
  return (
    <tbody {...getTableBodyProps()}>
      {page.map((row, index) => {
        prepareRow(row);
        return (
          <tr
            {...row.getRowProps()}
            css={[tw`cursor-auto min-w-0 border-b border-b-gray-300 bg-white`]}
          >
            {row.cells.map((cell, i2) => {
              return (
                <td
                  {...cell.getCellProps()}
                  css={[tw`px-2 py-4 text-left font-normal bg-white`]}
                  key={`${index}-${i2}`}
                >
                  <Skeleton>
                    <Skeleton.Line containerCss={[tw`h-6 rounded-md`]} />
                  </Skeleton>
                </td>
              );
            })}
          </tr>
        );
      })}
    </tbody>
  );
};
