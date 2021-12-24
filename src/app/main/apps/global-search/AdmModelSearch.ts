import {AdmPerson} from '../../../shared/adm-models/AdmPerson';
import { AdmBalanceAccount } from '../accounts/AdmAccounts';

export class AdmModelSearchAssociate {
    global_search_type: string;
    records;
}


export class AsociateRecords {
    person: AdmPerson;
}

export class AccountRecords {
    account: AdmBalanceAccount;
}


export interface SearchMenuOptions {
    title: string;
    basePath: string;
    singlePath?:  boolean;
    extraPath? : string;
}




