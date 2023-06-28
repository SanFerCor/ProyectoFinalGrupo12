import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from '../models/category.model';

@Injectable()
export class CategoryService {
  private baseUrl = import.meta.env['NG_APP_CATEGORIES_URL'];

  constructor(private readonly httpClient: HttpClient) {}

  add(category: Category){
    return this.httpClient.post(`${this.baseUrl}/api/categories`, category);
  }

  update(category: Category){
    return this.httpClient.put(`${this.baseUrl}/api/categories/${category.code}`, category);
  }

  list(search?: string, categoryCode?: string) {
    return this.httpClient.get<Category[]>(`${this.baseUrl}/api/categories?search=${search??''}&categoryCode=${categoryCode??''}`);
  }

  delete(code: string) {
    return this.httpClient.delete(`${this.baseUrl}/api/categories/${code}`)
  }
}
