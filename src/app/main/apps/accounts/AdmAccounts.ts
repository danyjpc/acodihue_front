import {environment as env } from '../../../../environments/environment';
import {AdmOrganizationResponsible} from '../../../shared/adm-models/AdmOrganization';
import {TypologyId} from '../../../shared/adm-models/AdmTypology';
import {AdmCreatedBy} from '../../../shared/adm-models/AdmUser';


export class AdmAccount {

    account_id: number =0;
    numAccount: number =0;
    numAccountOrder: number= 0;
    organizationResponsible: AdmOrganizationResponsible;
    accountType: TypologyId;
    date_created: string = env.NOW;
    status: TypologyId;
    createdBy: AdmCreatedBy

    constructor(){
        this.organizationResponsible = new AdmOrganizationResponsible();
        this.accountType = new TypologyId();
        this.accountType.typologyId = env.DEFAULT_ACCOUNT_TYPE_AHORRO;
        this.accountType.value1 =  '11';
        this.accountType.value_2 = '#a0f7c6';
        this.status = new TypologyId();
        this.status.typologyId = env.DEFAULT_STATUS_ACTIVE;
        this.createdBy = new AdmCreatedBy();

    }
}


export class AdmBalanceAccount {
    personAccount: AdmAccount;
    balance = 0;

    constructor() {
        this.personAccount = new AdmAccount();
    }
}



export class AdmAccountBalanceDetail {
    account_balance_id = 0;
    account_id  = 0;
    transaction_no: number;
    annotation: string;
    debit = 0;
    credit = 0;
    balance = 0;
    transactionType: TypologyId;
    date_created: string = env.NOW;

    constructor() {
        this.transactionType = new TypologyId();
    }

}


export class AdmtransactionsAccount {
    account_balance_id: number; 
    account_id: number;
    amount: number;
    annotation: string ='';
    createdBy: AdmCreatedBy;
    date_created: string = env.NOW;
    status: TypologyId;
    transactionType: TypologyId;
    transaction_no: number = 0

    constructor(){
        this.createdBy = new AdmCreatedBy();
        this.status =  new TypologyId();
        this.status.typologyId =  env.DEFAULT_STATUS_ACTIVE;
        this.transactionType = new TypologyId();
    }
}
