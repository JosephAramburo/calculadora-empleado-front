import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiRestClass } from '@class/api-rest-class';
import { environment } from '@env/environment';
import { ApiRestInterface, FilterInterface } from '@interfaces/api-rest-interface';
import { MovementInterface, MovementPaginatedInterface } from '@interfaces/movement-interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovementService extends ApiRestClass implements ApiRestInterface<MovementInterface, MovementPaginatedInterface> {
  url: string = `${environment.API}movement`;

  constructor(
    private _httpClient : HttpClient
  ) {
    super();
  }

  get(): Observable<MovementInterface[]> {
    throw new Error('Method not implemented.');
  }

  paginated(filter: FilterInterface): Observable<MovementPaginatedInterface> {
    return this._httpClient.get<MovementPaginatedInterface>(`${this.url}/paginated`, { params: this.getParams(filter) });
  }

  getById(id: number): Observable<MovementInterface> {
    return this._httpClient.get<MovementInterface>(`${this.url}/${id}`);
  }

  post(params: MovementInterface): Observable<MovementInterface> {
    return this._httpClient.post<MovementInterface>(this.url, params);
  }

  put(params: MovementInterface): Observable<MovementInterface> {
    return this._httpClient.put<MovementInterface>(`${this.url}/${params.id}`, params);
  }

  delete(id: number): Observable<MovementInterface> {
    throw new Error('Method not implemented.');
  }
}
