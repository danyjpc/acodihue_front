import {AdmCreatedBy} from '../../../shared/adm-models/AdmUser';
import { environment as env } from '../../../../environments/environment';
import { TypologyId } from '../../../shared/adm-models/AdmTypology';
import { PersonKey } from '../../../shared/adm-models/AdmPerson';
import {AmortizationParams, CalucatorId} from '../operations/credit-calucalator-interface'
import { AdmOrganization, organizationAgency, OrganizationAsociacion } from '../../../shared/adm-models/AdmOrganization';

export class AdmCredit {
    creditKey: string;
    createdBy: AdmCreatedBy;
    dateCreated: string = env.NOW;
    status: TypologyId;
    activityAccount: ActivityAccount;
    estateDate: string = env.NOW;
    statusOperated: TypologyId;
    operatedBy: PersonKey;
    annotation: string = '';
    occupation: TypologyId;
    ownHouse: boolean = true;
    calculator: AmortizationParams;
    profession: TypologyId;
    organization: organizationAgency
    internalCode?: string;



    constructor(){
        this.createdBy = new AdmCreatedBy();
        this.status = new TypologyId();
        this.status.typologyId = env.DEFAULT_STATUS_ACTIVE
        this.statusOperated =  new TypologyId();
        this.statusOperated.typologyId = env.DEFAULT_CREDIT_STATUS_PENDIENTE

        this.operatedBy =  new AdmCreatedBy();
   
        this.occupation = new TypologyId()
        this.occupation.typologyId =  env.DEFAULT_PROFESION_COMERCIANTE_TYPOLOGY
        this.profession = new TypologyId()
        this.profession.typologyId =  env.DEFAULT_PROFESION_COMERCIANTE_TYPOLOGY
        this.organization = new organizationAgency();
        this.calculator = new AmortizationParams();
        this.activityAccount = new ActivityAccount();

    }
}


export class ActivityAccount {
    activityAccountId: number = 2021
}

//Patrimonial Status
export class AdmPatrimonialStatus{
    total : number = 0;
    accounts : AdmPatrimonialAccounts [] = []
}

export class AdmPatrimonialAccounts{
    balanceSheetId : number= 0;
    amount : number =0;
    account : TypologyId;

    constructor(){
        this.account = new TypologyId()
        this.account.typologyId = env.EMPTY_TYPOLOGY
        this.account.description = 'S/D'
    }
}

