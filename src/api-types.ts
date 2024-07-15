import { ISearchParams } from "./hooks/use-search";

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

export const Topics = [
  { name: "Music", id: 1 },
  { name: "Sport", id: 2 },
  { name: "Theatre", id: 3 },
  { name: "Other", id: 4 },
];
