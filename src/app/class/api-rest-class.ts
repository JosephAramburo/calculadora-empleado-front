import { HttpParams } from "@angular/common/http";

export class ApiRestClass {
    getParams(params:any): HttpParams{
        let httpParams : HttpParams = new HttpParams();
        Object.keys(params).forEach(x => {
          let i : any = params as any;
          httpParams  = httpParams.append(x, i[x]);
        });

        return httpParams;
    }
}