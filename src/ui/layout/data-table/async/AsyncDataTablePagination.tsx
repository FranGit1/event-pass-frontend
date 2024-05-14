import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import { useEffect, useMemo, useState } from 'react';

import { Typography } from '../../../Typography';
import { buildPaginationItems } from './build-pagination-items';
import tw from 'twin.macro';
import { useTranslation } from 'react-i18next';

interface IAsyncDataTablePaginationProps {
  currentPage: number;
  maxPage: number;
  setCurrentPage(value: number): void;
  canPreviousPage: boolean;
  canNextPage: boolean;
  pageSize: number;
  totalOnPage: number;
  totalCount: number;
  setShowTable: React.Dispatch<React.SetStateAction<boolean>>;
  showExpandButton: boolean;
  showTable: boolean;
}

export const AsyncDataTablePagination = (props: IAsyncDataTablePaginationProps) => {
  const {
    setCurrentPage,
    maxPage,
    canNextPage,
    pageSize,
    totalOnPage,
    canPreviousPage,
    totalCount,
    setShowTable,
    showTable,
    showExpandButton
  } = props;

  const [page, setPage] = useState(props.currentPage);
  const { t } = useTranslation();

  useEffect(() => {
    setPage(props.currentPage);
  }, [props.currentPage]);

  const paginationItems = useMemo(() => buildPaginationItems(page, maxPage), [page, maxPage]);

  const onPageChange = (page: number) => {
    setPage(page);
    setCurrentPage(page);
  };

  const showDivider = maxPage > 3 && paginationItems[2] + 1 !== paginationItems[3];
  const initialItem = page === 1 ? 1 : (page - 1) * pageSize + 1;
  const finalItem = initialItem + totalOnPage - 1;

  const iconStyle = tw`h-9 w-9 mx-2 text-primary-100 hover:(text-primary)`;
  const iconDisabledStyle = tw`cursor-not-allowed text-gray-300 hover:(text-gray-300)`;

  return (
    !showExpandButton && (
      <Typography.Body
        containerCss={[tw`text-primary cursor-pointer hover:(text-gray)`, showTable && tw`hidden`]}
        onClick={() => {
          setShowTable(true);
        }}
      >
        {t('expandList')}
      </Typography.Body>
    )
  );
  // <div css={[tw`bg-white rounded-b-xl px-4 py-3`, tw`flex flex-row items-center justify-center`]}>
  //   <Typography.Body containerCss={[tw`text-gray mr-3`]}>
  //     {`${initialItem}-${finalItem} of ${totalCount}`}
  //   </Typography.Body>

  //   <HiChevronLeft
  //     onClick={() => onPageChange(Math.max(1, page - 1))}
  //     css={[iconStyle, !canPreviousPage && iconDisabledStyle]}
  //   />

  //   <div css={[tw`flex flex-row items-center gap-x-1`]}>
  //     {paginationItems.map((p, i) => {
  //       const key = `${i}-${p}`;
  //       return (
  //         <div key={key} css={[tw`flex flex-row items-center`]}>
  //           <Typography.Body
  //             onClick={() => onPageChange(p)}
  //             containerCss={[
  //               tw`py-2 px-4 rounded-md cursor-pointer text-primary-100`,
  //               tw`hover:(bg-primary-400 text-primary)`,
  //               p === page && tw`cursor-default bg-primary-100 text-white hover:(bg-primary-100 text-white)`
  //             ]}
  //           >
  //             {p}
  //           </Typography.Body>

  //           {showDivider && i === 2 && (
  //             <Typography.Body onClick={() => onPageChange(p)} containerCss={[tw`text-primary mx-2`]}>
  //               {`. . .`}
  //             </Typography.Body>
  //           )}
  //         </div>
  //       );
  //     })}
  //   </div>

  //   <HiChevronRight
  //     onClick={() => onPageChange(Math.min(maxPage, page + 1))}
  //     css={[iconStyle, !canNextPage && iconDisabledStyle]}
  //   />
  // </div>
};
