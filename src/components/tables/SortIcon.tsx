import { TiArrowSortedDown, TiArrowSortedUp } from 'react-icons/ti';
import { ReactComponent as Arrows } from '../../assets/icons/sort-arrows.svg';

interface SortIconProps {
  column: string;
  sortColumn: string;
  sortOrder: 'asc' | 'desc';
  handleToggleSort: (column: string) => void;
}

export const SortIcon: React.FC<SortIconProps> = ({ column, sortColumn, sortOrder, handleToggleSort }) => {
  const isSorted = sortColumn === column;
  const isAsc = isSorted && sortOrder === 'asc';
  const isDesc = isSorted && sortOrder === 'desc';

  return (
    <div onClick={() => handleToggleSort(column)}>
      {isAsc && <TiArrowSortedDown tw="cursor-pointer" />}
      {isDesc && <TiArrowSortedUp tw="cursor-pointer" />}
      {!isSorted && <Arrows tw="cursor-pointer" data-column={column} data-order={isSorted ? sortOrder : undefined} />}
    </div>
  );
};
