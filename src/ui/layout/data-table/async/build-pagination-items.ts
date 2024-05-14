export const buildPaginationItems = (
  currentPage: number,
  totalPages: number
) => {
  const items = [
    currentPage - 4,
    currentPage - 3,
    currentPage - 2,
    currentPage - 1,
    currentPage,
    currentPage + 1,
    currentPage + 2,
    Math.max(totalPages - 1, currentPage + 3),
    Math.max(totalPages, currentPage + 4),
  ].filter((i) => i > 0 && i <= totalPages);

  if (totalPages <= 5) {
    return items;
  }

  const currentPageIndex = items.indexOf(currentPage);
  const endIndex = items.length;
  const inLastTwo = currentPageIndex + 2 >= endIndex;
  if (inLastTwo) {
    return items.slice(endIndex - 5, endIndex);
  } else {
    const lastPart = items.slice(endIndex - 2, endIndex);
    const isLastOnFirstPart = currentPage + 1 === lastPart[0];
    const index = isLastOnFirstPart
      ? currentPageIndex - 2
      : Math.max(0, currentPageIndex - 1);

    const firstPart = items.slice(index, index + 3);
    return [...firstPart, ...lastPart];
  }
};
