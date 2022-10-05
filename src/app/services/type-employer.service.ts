import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiRestClass } from '@class/api-rest-class';
import { environment } from '@env/environment';
import { TypeEmployerInterface } from '@interfaces/type-employer-interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TypeEmployerService extends ApiRestClass {
  url : string = `${environment.API}typeEmployer`;

  constructor(private httpClient: HttpClient) {
    super();
   }

   get():Observable<TypeEmployerInterface[]>{
    return this.httpClient.get<TypeEmployerInterface[]>(this.url);
   }
}
