import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ResponseType, CategoryType } from '../types';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  constructor(private http: HttpClient) {}

  createCategory = (body: CategoryType) => {
    return this.http.post<ResponseType<{ data: { category: CategoryType } }>>(
      `${environment.BACK_URL}/categories/create`,
      body
    );
  };

  updateCategory = (body: CategoryType) => {
    return this.http.put<ResponseType<{ data: { category: CategoryType } }>>(
      `${environment.BACK_URL}/categories/update`,
      body
    );
  };

  getAllCategories = (body?: { purpose: string }) => {
    return this.http.post<{ data: { categories: CategoryType[] } }>(
      `${environment.BACK_URL}/categories/getAll`,
      body
    );
  };
}
