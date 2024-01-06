import { CategoryType } from './categoryType';

export type RegisterType = {
  id: number;
  createAt: Date;
  updatedAt: Date;
  category: number;
  value: number;
  purpose: string;
  deleted: boolean;
  category_info: CategoryType;
};
