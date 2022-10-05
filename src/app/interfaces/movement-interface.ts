import { DefaultInterface } from './employer-interface';
export interface MovementPaginatedInterface {
    count   : number;
    rows    : MovementRowInterface[];
}

export interface MovementRowInterface extends MovementInterface{
    employer        : DefaultInterface;
    amountByMonth   ?: number;
    amountToPayment ?: number;
    amountByDelivery?: number;
    amountVouchers  ?: number;
    bonus           ?: number;
    total           ?: number;
    sumAmounts      ?: number;
}

export interface MovementInterface {
    id                  : number;
    employerId          : number;
    dateMovement        : string;
    quantityDeliveries  : number;
    coverShifts         : boolean | string;
    daysCovered         ?: number;
    roleCoveredId       ?: number;
}
