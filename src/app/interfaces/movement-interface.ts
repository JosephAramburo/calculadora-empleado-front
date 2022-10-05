import { DefaultInterface } from './employer-interface';
export interface MovementPaginatedInterface {
    count   : number;
    rows    : MovementRowInterface[];
}

export interface MovementRowInterface extends MovementInterface{
    employer        : DefaultInterface;
}

export interface MovementInterface {
    id                  : number;
    employerId          : number;
    dateMovement        : string;
    quantityDeliveries  : number;
    coverShifts         : boolean | string;
    quantityDaysShifts  : number;
}
