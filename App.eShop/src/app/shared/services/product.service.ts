import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product.model';

@Injectable()
export class ProductService {
  private baseUrl = import.meta.env['NG_APP_PRODUCTS_URL'];

  constructor(private readonly httpClient: HttpClient) {}

  add(product: Product){
    return this.httpClient.post(`${this.baseUrl}/api/products`, product);
  }

  update(product: Product){
    return this.httpClient.put(`${this.baseUrl}/api/products/${product.code}`, product);
  }

  list(search?: string, categoryCode?: string) {
    return this.httpClient.get<Product[]>(`${this.baseUrl}/api/products?search=${search??''}&categoryCode=${categoryCode??''}`);
  }

  delete(code: string) {
    return this.httpClient.delete(`${this.baseUrl}/api/products/${code}`)
  }
}
