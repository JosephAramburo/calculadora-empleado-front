export interface EmployerPaginatedInterface {
    count   : number;
    rows    : EmployerRowInterface[];
}

export interface DefaultInterface{
    id      ?: number;
    name    : string;
}

export interface EmployerRowInterface extends EmployerInterface{
    role            : DefaultInterface;
    typeEmployer    : DefaultInterface;
}


export interface EmployerInterface {
    id                  : number;
    name                : string;
    lastName            : string;
    roleId              : string;
    typeEmployerId      : string;
    status              : string;
}
