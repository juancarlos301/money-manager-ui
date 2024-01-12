import { CategoryType } from './categoryType';

export type RegisterType = {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  category: number;
  value: string;
  purpose: string;
  deleted: boolean;
  category_info: CategoryType;
};
