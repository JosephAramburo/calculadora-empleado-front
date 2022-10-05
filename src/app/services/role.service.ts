import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiRestClass } from '@class/api-rest-class';
import { environment } from '@env/environment';
import { RoleInterface } from '@interfaces/role-interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleService extends ApiRestClass {
  url : string = `${environment.API}role`;

  constructor(private httpClient: HttpClient) {
    super();
   }

   get():Observable<RoleInterface[]>{
    return this.httpClient.get<RoleInterface[]>(this.url);
   }
}
