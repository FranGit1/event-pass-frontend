import { ISearchParams } from './hooks/use-search';

export type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  address: string;
  job: string;
  university: string;
  employeeId: string;
  isAmerican: boolean;
  age: number;
};

export type UploadedFile = {
  id?: string;
  name?: string;
  size?: number;
};

export type UserSearchParams = ISearchParams<any, keyof User>;
export type PaginatedResponse<T> = {
  records: T[];
  total: number;
};

export enum ProjectType {
  Realestate = 'realestate',
  Preview = 'preview'
}

export type FilterDataPrefill = {
  floorNumberArray: number[];
  bathroomsArray: number[];
  bedroomsArray: number[];
  availabilityStatusArray: string[];
};
