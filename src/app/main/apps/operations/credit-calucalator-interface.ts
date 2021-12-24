import { ContactPerson } from 'app/shared/adm-models/AdmPerson';
import { AdmCreatedBy } from 'app/shared/adm-models/AdmUser';
import {environment as env} from '../../../../environments/environment';
import { AdmCreditLine } from '../management/credit-lines/AdmCreditLines';

export class AdmAmortizations {
    noPago: number;
    fecha: string = env.NOW;
    pago: number;
    capital: number;
    capitalPagado: number;
    interes: number;
    interesPagado: number;
    saldo: number;
}

export class  AmortizationParams  {
    calculatorId?: number;
    person: ContactPerson;
    applicationDate: string = env.NOW;
    noPeriod: number;
    noPayments: number;
    interestRate: number = 19;
    createdBy: AdmCreatedBy;
    credit: number;
    creditLine: AdmCreditLine;
    interestFinal = 0;

    constructor(){
        this.createdBy = new AdmCreatedBy();
        this.person = new ContactPerson();
        this.creditLine = new AdmCreditLine();
    }

}


export class AdmAmortizationsTable {
    header: AmortizationParams;
    calculations: AdmAmortizations[];
}

export class CalucatorId {
    calculatorId: number;
}