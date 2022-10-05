import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiRestClass } from '@class/api-rest-class';
import { environment } from '@env/environment';
import { ApiRestInterface, FilterInterface } from '@interfaces/api-rest-interface';
import { EmployerInterface, EmployerPaginatedInterface } from '@interfaces/employer-interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployerService extends ApiRestClass implements ApiRestInterface<EmployerInterface, EmployerPaginatedInterface> {
  url : string = `${environment.API}employer`;

  constructor(
    private _httpClient : HttpClient
  ) {
    super();
  }

  get(): Observable<EmployerInterface[]> {
    return this._httpClient.get<EmployerInterface[]>(this.url);
  }

  paginated(filter: FilterInterface): Observable<EmployerPaginatedInterface> {
    return this._httpClient.get<EmployerPaginatedInterface>(`${this.url}/paginated`, { params: this.getParams(filter) });
  }

  getById(id: number): Observable<EmployerInterface> {
    throw new Error('Method not implemented.');
  }

  post(params: EmployerInterface): Observable<EmployerInterface> {
    return this._httpClient.post<EmployerInterface>(this.url, params);
  }

  put(params: EmployerInterface): Observable<EmployerInterface> {
    throw new Error('Method not implemented.');
  }

  delete(id: number): Observable<EmployerInterface> {
    throw new Error('Method not implemented.');
  }  
}
