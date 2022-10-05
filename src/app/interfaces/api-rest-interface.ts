import { Observable } from "rxjs";

export interface FilterInterface{
    currentPage : number;
    limit       : number;
    filter     ?: string;
}

export interface ApiRestInterface<T, TP> {
    get():Observable<T[]>;
    
    paginated(filter : FilterInterface):Observable<TP>;

    getById(id: number):Observable<T>;

    post(params: T):Observable<T>;

    put(params: T):Observable<T>;

    delete(id: number):Observable<T>;
}
