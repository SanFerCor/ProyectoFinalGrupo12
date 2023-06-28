import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Marca } from '../models/marca.model';

@Injectable()
export class MarcaService {
  private baseUrl = import.meta.env['NG_APP_BRANDS_URL'];

  constructor(private readonly httpClient: HttpClient) {}

  add(marca: Marca){
    return this.httpClient.post(`${this.baseUrl}/api/marcas`, marca);
  }

  update(marca: Marca){
    return this.httpClient.put(`${this.baseUrl}/api/marcas/${marca.name}`, marca);
  }

  list(search?: string, categoryCode?: string) {
    return this.httpClient.get<Marca[]>(`${this.baseUrl}/api/marcas?search=${search??''}`);
  }

  delete(code: string) {
    return this.httpClient.delete(`${this.baseUrl}/api/marcas/${code}`)
  }
}
