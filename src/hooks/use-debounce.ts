//@ts-ignore
import debounce from 'lodash/debounce';
import { useCallback } from 'react';

export const useDebounce = (cb: any, dependencies: any[], milliseconds?: number) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounced = useCallback(debounce(cb, milliseconds ?? 350), dependencies);
  return debounced;
};
